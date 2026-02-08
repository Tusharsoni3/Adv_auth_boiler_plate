# Advance Auth Boilerplate 🔐

A robust, production-ready backend authentication system built with **Node.js**, **Drizzle ORM**, and **PostgreSQL**. This boilerplate features a dual-layer security model including JWT-based sessions and Two-Factor Authentication (2FA).

## 🚀 Features

* **Secure Signup/Login**: Password hashing using `bcrypt`.
* **JWT Authentication**: Stateless session management with `httpOnly` cookies.
* **Email Verification**: OTP-based email confirmation upon signup.
* **Two-Factor Authentication (2FA)**: Secondary security layer via email-sent codes.
* **Password Recovery**: Secure reset flow using hashed tokens and expiry windows.
* **Database Management**: Type-safe queries and migrations with **Drizzle ORM**.
* **Mailing System**: Integrated with **Nodemailer** (supports real SMTP & Ethereal testing).

## 🛠️ Tech Stack

* **Runtime**: Node.js (ES Modules)
* **Framework**: Express.js
* **Database**: PostgreSQL
* **ORM**: Drizzle ORM
* **Security**: JSON Web Tokens (JWT), Bcrypt, Crypto API
* **Validation**: Zod (optional/extensible)

## 📋 Prerequisites

- Node.js (v18+)
- PostgreSQL Database
- An SMTP provider (like Gmail, SendGrid, or Resend)

## ⚙️ Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Tusharsoni3/Advance-auth-boolier-plate.git](https://github.com/Tusharsoni3/Advance-auth-boolier-plate.git)
   cd Advance-auth-boolier-plate/backend
2. Install dependencies : 
   ```bash
    npm install
3. **.env**
   ```bash
    PORT=3000
    NODE_ENV=development
    DATABASE_URL=postgres://user:password@localhost:5432/your_db
    JWT_SECRET=your_super_secret_key
    FRONTEND_URL=http://localhost:5173
    Run Database Migrations:


Start the server:

```Bash
Method,Endpoint,Description
POST,/api/auth/signup,Register a new user
POST,/api/auth/login,Login (returns 2FA challenge if enabled)
POST,/api/auth/verify,Verify Email OTP
POST,/api/auth/verify-2fa,Complete 2FA Login
POST,/api/auth/forgot-password,Send reset link
POST,/api/auth/reset-password/:token,Update password
POST,/api/auth/logout,Clear auth cookies

       
