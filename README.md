<div align="center">

<img src=".github/banner.svg" alt="MindVault Banner" width="100%" />

# 🧠 MindVault

**An offline-first personal second brain built with Next.js.**

_No accounts • No passwords • No database • Just open and start writing._

<br/>

![Offline First](https://img.shields.io/badge/Offline--First-Yes-9d7bff?style=for-the-badge)
![No Accounts](https://img.shields.io/badge/Accounts-None-3fe0d0?style=for-the-badge)
![Database](https://img.shields.io/badge/Database-None-ffb84d?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Monorepo-3178c6?style=for-the-badge&logo=typescript)

</div>

---

## ✨ Overview

MindVault is a lightweight **offline-first knowledge vault** that helps you capture everything in one place.

Instead of creating an account or connecting a database, the app simply asks for your name the first time you open it. From there, everything is stored locally in your browser, making it fast, private, and instantly usable.

Whether it's notes, ideas, tasks, links, or reading material, MindVault is designed to act as your personal second brain.

---

# 🚀 Features

| | | |
|---|---|---|
| 📝 **Notes** | ✅ **Task Management** | 💡 **Idea Capture** |
| 🔗 **Save Links** | 📚 **Reading List** | 🗂️ **Collections** |
| 🏷️ **Tags & Favorites** | 🔍 **Instant Search** | 🕓 **Activity Timeline** |
| 🖼️ **Image/File Uploads** | 📦 **JSON Export & Import** | 🔗 **Share Items via URL** |

---

# ⚡ Why MindVault?

- 🚫 No authentication
- 🚫 No passwords
- 🚫 No backend
- 🚫 No database setup
- ⚡ Instant startup
- 🔒 Your data stays in your browser
- 📱 Responsive design
- 🧩 Easy to extend later with a backend

---

# 🏗️ Project Structure

```text
apps/
└── web/
    ├── app/
    ├── components/
    ├── hooks/
    ├── lib/
    │   └── storage/
    └── ...

packages/
├── ui/
├── types/
├── config/
├── eslint-config/
└── tsconfig/
```

---

# 🧩 Architecture

Every component communicates through a single storage abstraction.

```text
Components & Hooks
        │
        ▼
Storage Layer
(apps/web/lib/storage)
        │
        ▼
Browser Local Storage
```

Because everything goes through this storage layer, migrating to MongoDB, Supabase, PostgreSQL, Firebase, or any backend later only requires replacing one implementation.

---

# 🛠️ Tech Stack

- **Next.js 15**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Turborepo**
- **Local Storage API**

---

# 📦 Getting Started

## Clone the repository

```bash
git clone https://github.com/your-username/mindvault.git
```

## Install dependencies

```bash
npm install
```

## Start the development server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

That's it.

No environment variables.

No MongoDB.

No API keys.

No authentication.

---

# 🚀 Deployment

Deploy **apps/web** to:

- Vercel
- Netlify
- Railway
- Any Node.js hosting provider

No database or environment variables are required.

---

# 💾 Data Storage

MindVault stores everything inside your browser using **Local Storage**.

```
Browser
    │
    ▼
Local Storage
    │
    ▼
Your Notes, Tasks, Ideas & Links
```

The entire application communicates with storage through a single abstraction layer, making it simple to migrate to a cloud backend in the future without rewriting the UI.

---

# 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

### 🧠 MindVault

**Your second brain shouldn't require an account.**

Capture ideas. Stay organized. Own your data.

⭐ Star the repository if you found it useful.

</div>
