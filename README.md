# 🔐 Full-Stack Login & Authentication System

<div align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-49.8%25-yellow?style=for-the-badge&logo=javascript)
![CSS](https://img.shields.io/badge/CSS-34.0%25-blue?style=for-the-badge&logo=css3)
![HTML](https://img.shields.io/badge/HTML-16.2%25-orange?style=for-the-badge&logo=html5)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen?style=for-the-badge&logo=mongodb)

A modern, secure, full-stack authentication system built with vanilla JavaScript, Node.js, Express, and MongoDB. Features user registration, login, session management, and a personalized dashboard.

[🚀 Live Demo](#-live-demo) • [✨ Features](#-features) • [🛠️ Tech Stack](#️-tech-stack) • [📦 Installation](#-installation) • [🌐 Deployment](#-deployment)

</div>

---

## 🚀 Live Demo

**Frontend (Vercel):**  
👉 [https://login-system-frontend-ochre.vercel.app](https://login-system-frontend-ochre.vercel.app)

**Backend API (Render):**  
👉 [https://login-system-backend-bu5v.onrender.com/health](https://login-system-backend-bu5v.onrender. com/health)

> **Note:** Backend may take 30-60 seconds to wake up on first request (free tier limitation). Subsequent requests are fast.

---

## ✨ Features

- ✅ **User Registration** - Create account with username, email, and password
- ✅ **Secure Authentication** - Password hashing with bcrypt (10 salt rounds)
- ✅ **User Login** - Email and password verification
- ✅ **Personalized Dashboard** - Display user information after login
- ✅ **Session Management** - localStorage-based session handling
- ✅ **Input Validation** - Client and server-side validation
- ✅ **Responsive Design** - Modern gradient UI with smooth animations
- ✅ **Error Handling** - Comprehensive error messages and logging
- ✅ **CORS Enabled** - Cross-origin resource sharing for API access
- ✅ **RESTful API** - Clean API endpoints for all operations

---

## 🛠️ Tech Stack

### **Frontend**
| Technology | Purpose |
|------------|---------|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) | Structure and markup |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) | Styling and animations |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) | Client-side logic and API calls |

### **Backend**
| Technology | Purpose |
|------------|---------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white) | Runtime environment |
| ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white) | Web framework |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) | NoSQL database |
| ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white) | MongoDB ODM |
| ![bcrypt. js](https://img.shields.io/badge/bcrypt.js-Security-red?style=flat-square) | Password hashing |

### **Deployment**
| Platform | Service |
|----------|---------|
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) | Frontend hosting |
| ![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=white) | Backend hosting |
| ![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white) | Cloud database |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                            │
│                     (Vercel Hosting)                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Index   │  │ Register │  │  Login   │  │Dashboard │   │
│  │   Page   │  │   Form   │  │   Form   │  │   Page   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP Requests (Fetch API)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      BACKEND API                            │
│                    (Render Hosting)                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Express.js Server                                   │  │
│  │  ┌────────────┐  ┌────────────┐  ┌──────────────┐   │  │
│  │  │ POST       │  │ POST       │  │ GET          │   │  │
│  │  │ /register  │  │ /login     │  │ /user/: id    │   │  │
│  │  └────────────┘  └────────────┘  └──────────────┘   │  │
│  └──────────────────────┬───────────────────────────────┘  │
└─────────────────────────┼───────────────────────────────────┘
                          │ Mongoose ODM
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER                           │
│                 (MongoDB Atlas Cloud)                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  LoginDB Database                                    │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  users Collection                              │  │  │
│  │  │  { username, email, password, timestamps }     │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
Login-system/
├── 📂 public/                  # Frontend files (Vercel)
│   ├── 📂 src/                 # HTML pages and styles
│   │   ├── index.html          # Landing page
│   │   ├── register.html       # Registration form
│   │   ├── register.css        # Registration styles
│   │   ├── login.html          # Login form
│   │   ├── login.css           # Login styles
│   │   ├── dashboard. html      # User dashboard
│   │   ├── dashboard.css       # Dashboard styles
│   │   └── styles.css          # Global styles
│   ├── 📂 js/                  # Client-side JavaScript
│   │   ├── register.js         # Registration logic
│   │   ├── login. js            # Login logic
│   │   └── dashboard.js        # Dashboard logic
│   └── index.html              # Root redirect
├── 📂 server/                  # Backend files (Render)
│   ├── 📂 models/              # Database models
│   │   └── User.js             # User schema (Mongoose)
│   ├── server.js               # Express server
│   ├── package.json            # Backend dependencies
│   └── . env                    # Environment variables (not in repo)
├── 📂 docs/                    # Documentation website
│   ├── index.html              # Project documentation
│   └── styles.css              # Documentation styles
├── . gitignore                  # Git ignore file
├── LICENSE                     # MIT License
└── README.md                   # This file
```

---

## 📦 Installation

### **Prerequisites**
- Node.js (v14+)
- MongoDB (local installation or MongoDB Atlas account)
- Git

### **Local Development Setup**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jedrzej-Klosowski/Login-system.git
   cd Login-system
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Create environment file**
   ```bash
   # server/.env
   MONGODB_URI=mongodb://127.0.0.1:27017/LoginDB
   PORT=3000
   FRONTEND_URL=http://localhost:5500
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

5. **Start the backend server**
   ```bash
   npm start
   # Server runs on http://localhost:3000
   ```

6. **Open frontend**
   - Use Live Server extension in VS Code, or
   - Open `public/src/index.html` in browser
   - Make sure frontend makes requests to `http://localhost:3000`

---

## 🌐 Deployment

This project is deployed across three platforms for optimal performance and cost-efficiency. 

### **1. Frontend → Vercel**

**Steps:**
1. Fork/clone this repository to your GitHub
2. Sign up at [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Configure: 
   - **Framework Preset:** Other
   - **Root Directory:** `public`
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)
5. Deploy!

**Environment Variables:** None needed for frontend

**Live URL:** `https://your-project. vercel.app`

---

### **2. Backend → Render**

**Steps:**
1. Sign up at [render.com](https://render.com)
2. Create new **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name:** `login-system-backend`
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

**Environment Variables (Required):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/LoginDB? retryWrites=true&w=majority
PORT=3000
FRONTEND_URL=https://your-vercel-url.vercel.app
```

5. Deploy!

**Live API:** `https://your-backend. onrender.com`

> ⚠️ **Important:** Free tier spins down after 15 minutes of inactivity. First request after sleep takes 30-60 seconds.

---

### **3. Database → MongoDB Atlas**

**Steps:**
1. Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a **Free M0 Cluster**
3. **Database Access:**
   - Create database user (username + password)
   - Save credentials securely
4. **Network Access:**
   - Add IP:  `0.0.0.0/0` (allow from anywhere)
5. **Get Connection String:**
   - Click "Connect" → "Drivers"
   - Copy connection string
   - Replace `<password>` with your password
   - Add database name: `/LoginDB`

**Example Connection String:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/LoginDB?retryWrites=true&w=majority
```

6. Add this to Render environment variables as `MONGODB_URI`

---

## 🔌 API Endpoints

### **Health Check**
```http
GET /health
```
**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

### **User Registration**
```http
POST /register
Content-Type:  application/json
```
**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```
**Response (201 Created):**
```json
{
  "message": "Registered successfully"
}
```

**Validation:**
- Username: Required, unique
- Email: Required, unique, valid format
- Password: Required, minimum 6 characters

---

### **User Login**
```http
POST /login
Content-Type: application/json
```
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```
**Response (200 OK):**
```json
{
  "message": "Logged in successfully",
  "userId": "507f1f77bcf86cd799439011",
  "email": "john@example.com",
  "username": "johndoe"
}
```

---

### **Get User Info**
```http
GET /user/: userId
```
**Response (200 OK):**
```json
{
  "username": "johndoe",
  "email": "john@example. com",
  "userId": "507f1f77bcf86cd799439011"
}
```

---

## 🔒 Security Features

| Feature | Implementation |
|---------|----------------|
| **Password Hashing** | bcrypt with 10 salt rounds |
| **Input Validation** | Server-side validation for all inputs |
| **Unique Constraints** | Mongoose schema ensures unique username/email |
| **CORS Protection** | Configured for specific origins |
| **Environment Variables** | Sensitive data stored in `.env` files |
| **MongoDB Injection Prevention** | Mongoose sanitizes queries |

---

## 🎯 User Flow

```mermaid
graph TD
    A[Landing Page] --> B{User Action}
    B -->|New User| C[Registration Form]
    B -->|Existing User| D[Login Form]
    C --> E[Submit Registration]
    E --> F{Validation}
    F -->|Success| D
    F -->|Error| C
    D --> G[Submit Login]
    G --> H{Authentication}
    H -->|Success| I[Dashboard]
    H -->|Error| D
    I --> J[Logout]
    J --> A
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Jędrzej Kłosowski**

- GitHub: [@Jedrzej-Klosowski](https://github.com/Jedrzej-Klosowski)
- Project Link: [https://github.com/Jedrzej-Klosowski/Login-system](https://github.com/Jedrzej-Klosowski/Login-system)

---

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Fast, unopinionated, minimalist web framework
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Vercel](https://vercel.com/) - Frontend hosting
- [Render](https://render.com/) - Backend hosting
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database

---

<div align="center">

⭐ Star this repo if you found it helpful!

</div>
