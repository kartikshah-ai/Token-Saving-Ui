# 🤖 AI Semantic Cache System

> An intelligent cost-saving architecture that combines LLM power with vector database caching to minimize API costs while delivering fast, accurate AI responses.

---

## 📌 Project Overview

This project implements a **Semantic Caching layer** on top of Google's Gemini LLM. Instead of calling the LLM every time a user asks a question, the system checks a **Qdrant vector database** first. If a semantically similar question has been asked before, it returns the cached answer instantly — saving both **time and API costs**.

---

## 🏗️ Architecture

```
User (Angular Frontend)
        │
        ▼
  Ask a Question
        │
        ▼
 Python Backend ──► Check Qdrant Vector DB
        │                    │
        │         ┌──────────┴──────────┐
        │         │                     │
        │    Similar Q found?      Not found
        │         │                     │
        │    Return cached         Call Google
        │      answer ✅           Gemini LLM
        │                               │
        │                        Store Q&A in
        │                         Qdrant DB
        │                               │
        └───────────────────────────────┘
                        │
                        ▼
              Return Answer to User
```

---

## ✨ Key Features

- 🧠 **Semantic Caching** — Finds similar questions using vector similarity, not just exact text match
- 💰 **Token & Cost Saving** — Reduces Google AI API calls significantly
- ⚡ **Fast Responses** — Cached answers return in milliseconds
- 🎨 **Attractive UI** — Clean, modern Angular frontend
- 📝 **Optimized Prompts** — Carefully engineered prompts to reduce token usage
- 🔄 **Multi-language Stack** — Angular + C# + Python working together

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Angular |
| **Backend API** | C# (.NET) |
| **AI / LLM** | Google Gemini AI |
| **Cache / Vector DB** | Qdrant |
| **Embedding & Logic** | Python |
| **Architecture Pattern** | RAG (Retrieval Augmented Generation) |

---


## 🚀 How It Works

### Step 1 — User Asks a Question
User types a question in the Angular frontend.

### Step 2 — Semantic Search in Qdrant
Python converts the question into a **vector embedding** and searches Qdrant for similar questions.

### Step 3 — Cache Hit or Miss
- ✅ **Cache Hit** → Similar question found → Return stored answer directly (no LLM call)
- ❌ **Cache Miss** → No similar question found → Call Google Gemini LLM

### Step 4 — Store & Return
If LLM was called, store the question + answer in Qdrant for future use. Return answer to user.

---

## 💡 Cost Saving Strategy

| Scenario | Without Cache | With Cache |
|----------|--------------|------------|
| 100 same questions | 100 LLM calls | 1 LLM call |
| API cost example | ₹100 | ₹1 |
| Response time | ~2-3 seconds | ~50ms |

---


## 📊 Results & Impact

- ⬇️ **Reduced LLM API calls** by caching repeated/similar questions
- ⚡ **10x faster** response for cached questions
- 💰 **Significant cost saving** on Google AI API usage
- 🎯 **Optimized prompts** further reduced token consumption

---

## 🧠 Concepts Used

- **RAG** (Retrieval Augmented Generation)
- **Vector Embeddings** for semantic similarity
- **Semantic Caching** pattern
- **Prompt Engineering** for token optimization
- **REST API** integration across multiple languages

---

## 👨‍💻 Author

**Kartik Shah**
- 4+ Years Software Developer (Angular + .NET + SQL Server)
- LinkedIn: [https://www.linkedin.com/in/kartik-shah-06190b19a/]
- GitHub: [https://github.com/kartikshah-ai]

---

## 📄 License

MIT License — feel free to use and modify!

---

⭐ **If this project helped you, please give it a star!**
