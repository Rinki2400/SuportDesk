# 🛠️ Support Desk System (User + Admin Panel)

A full-featured support desk web application built using the **MERN Stack**. It allows users to create support tickets and track their status, while admins can manage all tickets, respond, and update them.

---

## 📌 Features

### 👤 User Panel
- Signup & Login
- Create support tickets
- View submitted tickets
- Track ticket status (Open, In Progress, Closed)
- Edit or delete own tickets

### 🔐 Admin Panel
- Secure admin login
- View all user tickets
- Update ticket status
- Edit or delete any ticket
- Access admin dashboard

---


## ⚙️ Tech Stack

| Category | Tech |
|----------|------|
| Frontend | React, Axios, React Router, Toastify |
| Backend  | Node.js, Express.js, Mongoose |
| Database | MongoDB |
| Auth     | JWT |
| Styling  | Custom CSS (Light Theme) |

## 🔑 Admin Credentials (Demo)

```bash
Email: admin@example.com
Password: admin@123


## 👤 Test User Credentials (Demo)

Email: user1@example.com  
Password: User@123


# 1. Clone the repository
git clone https://github.com/Rinki2400/SuportDesk.git
cd support-desk

# 2. Install server dependencies
cd server
npm install

# 3. Install client dependencies
cd ../frontend
npm install

# Start backend
cd backend
npm run dev

# Start frontend (in a separate terminal)
cd backend
npm start
