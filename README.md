# ⚡ Fluxely

**The Personal Chaos Sorter.**  
Upload your mess — screenshots, voice notes, files, or emails — and Fluxely turns them into clear tasks, summaries, or content.  
Built for founders, power users, and maniacs who move fast.

👉 Try it now: [fluxely.vercel.app](https://fluxely.vercel.app)  
🧠 Open Source: [github.com/RakshitGumber/Fluxely](https://github.com/RakshitGumber/Fluxely)  
👥 Join the backend dev community: [Discord Invite](https://discord.gg/YOUR_INVITE)

---

## 🚨 Why Fluxely?

You’re drowning in raw data:

- Voice memos piling up
- Screenshots you never look at
- Emails you keep starring but never answer

**Fluxely is the antidote.**  
It uses AI to _intelligently sort your chaos_ into:

- ✅ Clear tasks
- 🧠 Smart summaries
- ✍️ Draft content (tweets, replies, reports)

All with your **final approval** before anything gets triggered.

---

## 🧩 Core Features

- 🧾 Upload voice notes, screenshots, emails, PDFs
- 🧠 LLM-powered task + content extraction
- 🕹️ Visual automation builder (no-code)
- 🔁 Connect actions (post on Twitter, send emails, etc.)
- 🔒 Human-in-the-loop: you approve before execution
- ⚡ Blazingly fast backend with autosave + Redis cache
- 🔧 Execution logs, notifications, rate limiting, and more

---

## 🛠 Tech Stack

**Frontend**

- React (TypeScript)
- Zustand (State)
- @xyflow/react (Flow UI)
- Tailwind CSS

**Backend**

- FastAPI + SQLModel
- PostgreSQL
- Redis
- LangChain + OpenAI/Gemini APIs

**DevOps**

- Vercel (Frontend)
- Docker (Backend)

---

## 🚧 Current Status

> Alpha mode — building fast, breaking faster.  
> Daily updates. Contributions welcome.

- ✅ Flow builder live
- ✅ Voice & screenshot upload working
- 🧠 AI model integrations in progress
- 🧪 Discord community open for feedback

---

## 💡 Vision

Fluxely isn’t just a task manager.  
It’s your **AI sidekick for sorting life itself.**  
From clutter to clarity — one node at a time.

---

## 📦 Local Setup

```bash
# Frontend
cd frontend
pnpm install
pnpm dev

# Backend
cd backend
python -m venv env
source env/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```
