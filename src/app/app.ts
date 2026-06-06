import { Component, OnInit, signal, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { marked } from 'marked';

@Pipe({
  name: 'markdown',
  standalone: true
})
export class MarkdownPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return marked.parse(value) as string;
  }
}

interface AnalyticsData {
  tenantId: string;
  totalRequests: number;
  cacheHits: number;
  hitRatioPercentage: number;
  totalTokensSaved: number;
  totalMoneySaved: number;
  recentActivity: any[];
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  isCached?: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MarkdownPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  data = signal<AnalyticsData | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  // Chat State
  chatHistory = signal<ChatMessage[]>([]);
  isAsking = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAnalytics();
  }

  fetchAnalytics() {
    this.loading.set(true);
    // Attempt HTTPS first
    const apiUrl = 'https://localhost:44319/api/Analytics/tenant_company_a';
    const headers = new HttpHeaders().set('X-Api-Key', 'sk-test-key-123');
    
    this.http.get<AnalyticsData>(apiUrl, { headers }).subscribe({
      next: (res) => {
        this.data.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        // Fallback to HTTP if HTTPS fails
        this.http.get<AnalyticsData>('http://localhost:9499/api/Analytics/tenant_company_a', { headers }).subscribe({
          next: (res) => {
            this.data.set(res);
            this.loading.set(false);
          },
          error: (e2) => {
             this.error.set('Could not load analytics. Make sure the C# API is running!');
             this.loading.set(false);
          }
        });
      }
    });
  }

  askQuestion(prompt: string, inputElement: HTMLInputElement) {
    if (!prompt.trim() || this.isAsking()) return;
    
    // Add user message to UI immediately
    this.chatHistory.update(history => [...history, { role: 'user', content: prompt }]);
    inputElement.value = ''; // clear input
    this.isAsking.set(true);
    
    const formData = new FormData();
    formData.append('Prompt', prompt);
    
    const headers = new HttpHeaders().set('X-Api-Key', 'sk-test-key-123');
    
    this.http.post<any>('https://localhost:44319/api/AIQA/AskQuestion', formData, { headers }).subscribe({
      next: (res) => {
        this.chatHistory.update(history => [...history, { 
          role: 'assistant', 
          content: res.answer, 
          isCached: res.wasCached 
        }]);
        this.isAsking.set(false);
        this.fetchAnalytics(); // Refresh dashboard stats
      },
      error: (err) => {
         // fallback to HTTP
         this.http.post<any>('http://localhost:9499/api/AIQA/AskQuestion', formData, { headers }).subscribe({
           next: (res2) => {
              this.chatHistory.update(history => [...history, { 
                role: 'assistant', 
                content: res2.answer, 
                isCached: res2.wasCached 
              }]);
              this.isAsking.set(false);
              this.fetchAnalytics();
           },
           error: () => {
             this.chatHistory.update(history => [...history, { role: 'assistant', content: 'Error: Could not reach the API.' }]);
             this.isAsking.set(false);
           }
         });
      }
    });
  }
}
