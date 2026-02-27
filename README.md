# 🌐 Open Source Weekend (OSW) — Web Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

**Open Source Weekend** is a community-driven web platform built by the [Open Source Community Foundation (OSCF)](https://github.com/oscfcommunity). It serves as the central hub for promoting open-source technologies through knowledge sharing, event management, blog posts, and community collaboration.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Chat App Setup](#chat-app-setup)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## 📖 About the Project

Open Source Weekend is an open-source initiative aimed at:

- 🤝 **Connecting** open-source enthusiasts and developers
- 📚 **Sharing knowledge** through blogs and resource libraries
- 🎉 **Organizing events** (online and offline) around open-source technologies
- 👥 **Showcasing** community team members and speakers
- 💬 **Enabling real-time** communication through an integrated chat application

---

## ✨ Features

| Feature | Description |
|---|---|
| **User Authentication** | Register/login via email-password or Google OAuth |
| **Blog System** | Create, edit, and publish rich-text blog posts |
| **Event Management** | Organize and join online/offline open-source events |
| **Team Profiles** | Showcase community team members and their roles |
| **Speaker Gallery** | Highlight speakers and their contributions |
| **Resource Library** | Discover and share open-source projects and resources |
| **Real-time Chat** | Socket.io-powered group chat application |
| **Notification System** | In-app notifications for events and activities |
| **Admin Panel** | Manage users, content, and platform settings |
| **Contact Form** | Community contact with form validation |

---

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT, bcrypt, Google OAuth
- **Email:** Nodemailer
- **File Uploads:** Multer
- **Task Scheduling:** node-cron

### Frontend
- **Framework:** React.js (v18)
- **Routing:** React Router DOM v6
- **UI Libraries:** Bootstrap 5, Material UI, Chakra UI
- **Rich Text Editor:** TinyMCE
- **Real-time:** Socket.io Client

### Chat Application
- **Server:** Node.js + Express + Socket.io
- **Frontend:** Vanilla JavaScript

---

## 📁 Project Structure

```
OSWeekend-Web/
├── OSW-backend/          # Express.js REST API server
│   ├── App.js            # Server entry point
│   ├── Controller/       # Business logic handlers
│   ├── Routes/           # API route definitions
│   ├── Models/           # MongoDB schemas
│   ├── Middlewares/      # Auth & file upload middleware
│   ├── Services/         # JWT, mail, OTP utilities
│   └── Database/         # MongoDB connection
│
├── OSW-frontend/         # React.js web application
│   └── src/
│       └── components/
│           ├── Blog/
│           ├── Event/
│           ├── User/
│           ├── Admin/
│           ├── Team/
│           ├── Speakers/
│           ├── ResourceLibrary/
│           ├── Notification/
│           └── ChatApp/  # Standalone chat application
│
└── LICENSE
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas)
- A Gmail account with an [App Password](https://support.google.com/accounts/answer/185833) for email services

---

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd OSW-backend

# 2. Install dependencies
npm install

# 3. Create your environment file (see Environment Variables section)
cp .env.example .env

# 4. Start the development server
npm run dev
```

The backend will start on **http://localhost:4000** by default.

---

### Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd OSW-frontend

# 2. Install dependencies
npm install

# 3. Start the React development server
npm start
```

The frontend will start on **http://localhost:3000** by default.

---

### Chat App Setup

```bash
# 1. Navigate to the chat app directory
cd OSW-frontend/src/components/ChatApp

# 2. Install dependencies
npm install

# 3. Create your environment file
# Add DBURL and PORT=9000 to a .env file

# 4. Start the chat server
npm start
```

The chat app will run on **http://localhost:9000** by default.

---

## 🔐 Environment Variables

Create a `.env` file inside the `OSW-backend/` directory with the following variables:

```env
# MongoDB connection string
DBURL=mongodb+srv://<username>:<password>@cluster.mongodb.net/osw

# Server port
PORT=4000

# JWT secret key
JWT_SEC=your_jwt_secret_key

# Gmail credentials for Nodemailer
MAILER=your_email@gmail.com
EMAILPASS=your_gmail_app_password

# OTP secret key
OTPSEC=your_otp_secret
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

---

## 🤝 Contributing

We welcome contributions from everyone! Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) guide to get started.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

<p align="center">Made with ❤️ by the <a href="https://github.com/oscfcommunity">OSCF Community</a></p>
