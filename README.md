# ColdConnect ✉️

**ColdConnect** is a full-stack tool that automates personalized cold emails to companies, attaches the appropriate resume, and tracks email activity.

---

## 🚀 Features

* Personalized email templates
* Automatic resume selection based on role
* Email preview before sending
* Gmail API email delivery
* Email open tracking
* Sent email history logging

---

## 🛠 Tech Stack

**Frontend**

* React
* Tailwind CSS
* Vite

**Backend**

* Node.js (Express)

**Automation Service**

* FastAPI (Python)

**Email Service**

* Gmail API

---

## 🧠 System Architecture

```
User (Browser)
      │
      ▼
React + Tailwind Frontend
(client)
      │
HTTP API Request
      ▼
Node.js Express Server
(server-node)
      │
Internal API Call
      ▼
Python FastAPI Service
(server-python)
      │
Email Processing
      ▼
Gmail API
      │
Send Email + Resume
```

---

## ▶️ Run Locally

### 1. Start Frontend

```bash
cd client
npm install
npm run dev
```

### 2. Start Node Backend

```bash
cd server-node
npm install
node server.js
```

### 3. Start Python Service

```bash
cd server-python
uvicorn main:app --reload --port 8000
```

---

## ⚠️ Important Note

Sensitive files such as:

* `credentials.json`
* `token.json`
* `.env`

are **excluded from the repository** for security reasons.

---

