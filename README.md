# 🔐 Login System

A modern, full-stack authentication web application featuring user registration, login, and a personalized dashboard.  Built with **Node.js** (Express) and **MongoDB** for the backend, with **JavaScript**, **HTML**, and **CSS** powering the frontend.

---

## ✨ Features

- **🆕 User Registration** – Create an account with username, email, and password (minimum 6 characters)
- **🔑 Secure Authentication** – Login with email and password verification
- **📊 User Dashboard** – Personalized dashboard displaying user information after login
- **🔒 Password Security** – Bcrypt hashing with 10 salt rounds for password encryption
- **💾 MongoDB Integration** – All user data persisted to MongoDB database
- **📱 Responsive Design** – Clean, modern UI that works seamlessly on mobile and desktop
- **⚠️ Error Handling** – User-friendly error messages for validation and server errors
- **🚪 Logout Functionality** – Secure session clearing with localStorage management
- **✅ Real-time Validation** – Client-side and server-side input validation

---

## 🛠️ Tech Stack

### Frontend
- **JavaScript** (44.6%)
- **CSS** (38.6%)
- **HTML** (16.8%)

### Backend
- **Node.js** & **Express 5.2.1**
- **MongoDB** with **Mongoose 8.20.2**
- **bcryptjs 3.0.3** – Password hashing
- **cors 2.8.5** – Cross-origin resource sharing
- **dotenv 17.2.3** – Environment variable management

---

## 📁 Project Structure

```
Login-system/
├── public/
│   ├── src/
│   │   ├── index.html          # Landing page
│   │   ├── login.html          # Login form
│   │   ├── login.css           # Login styles
│   │   ├── register.html       # Registration form
│   │   ├── register.css        # Registration styles
│   │   ├── dashboard.html      # User dashboard
│   │   ├── dashboard.css       # Dashboard styles
│   │   └── styles.css          # Global styles
│   └── js/
│       ├── login.js            # Login logic
│       ├── register. js        # Registration logic
│       └── dashboard.js        # Dashboard logic & user data fetching
├── server/
│   ├── models/
│   │   └── User.js             # Mongoose User schema
│   ├── routes/
│   │   └── auth.js             # Authentication routes (alternative implementation)
│   ├── . gitignore             # Git ignore file
│   ├── server.js               # Main server file
│   └── package.json            # Dependencies
└── README.md
```

---

## ⚡ Quick Start

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** running locally

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Jedrzej-Klosowski/Login-system. git
cd Login-system
```

2. **Install dependencies**
```bash
cd server
npm install
```

### Running the Application

```bash
# From the repository root
node server/server.js
```

The server will start at:  **http://localhost:3000**

You should see: 
```
[OK] Connected to MongoDB
[OK] Server running on http://localhost:3000
```

---

## 📖 Usage Guide

1. Open your browser and navigate to `http://localhost:3000`
2. Click **"Register"** to create a new account
3. Fill in the registration form: 
   - Username (unique)
   - Email (unique)
   - Password (minimum 6 characters)
   - Confirm Password
4. After successful registration, you'll be redirected to the **Login** page
5. Enter your email and password to log in
6. Upon successful login, you'll be redirected to your **Dashboard**
7. The dashboard displays: 
   - Personalized greeting with your username
   - Your registered email address
   - Logout button
8. Click **"Logout"** to end your session

![demo](https://github.com/user-attachments/assets/135ba0cb-b4bc-4dbf-aff0-fac3a66a6d18)


> **Note:** User authentication data is stored in browser's `localStorage` (userId, email)

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `POST` | `/register` | Register a new user | `{ username, email, password }` | `{ message, userId }` |
| `POST` | `/login` | Authenticate user | `{ email, password }` | `{ message, userId, email }` |
| `GET` | `/user/:userId` | Get user information | - | `{ username, email, userId }` |

### Example API Requests

**Registration:**
```javascript
fetch('http://localhost:3000/register', {
  method: 'POST',
  headers: { 'Content-Type':  'application/json' },
  body: JSON.stringify({
    username: 'johndoe',
    email: 'john@example.com',
    password: 'securePassword123'
  })
});
```

**Login:**
```javascript
fetch('http://localhost:3000/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'securePassword123'
  })
});
```

**Get User Data:**
```javascript
const userId = localStorage.getItem('userId');
fetch(`http://localhost:3000/user/${userId}`)
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 🔒 Security Features

- ✅ **Password Hashing** – Bcrypt with 10 salt rounds
- ✅ **Unique Constraints** – Email and username uniqueness enforced at database level
- ✅ **Input Validation** – Both client-side and server-side validation
- ✅ **Password Confirmation** – Frontend password matching validation
- ✅ **Error Messages** – Generic messages to prevent user enumeration
- ✅ **CORS Enabled** – Controlled cross-origin requests
- ⚠️ **Production Recommendations:**
  - Implement JWT tokens instead of localStorage
  - Add HTTPS/TLS encryption
  - Implement rate limiting
  - Add CSRF protection
  - Use HTTP-only cookies for session management
  - Add input sanitization
  - Implement password strength requirements

---

## 📄 License

This project is currently unlicensed. See the repository for more information.

---

## 👨‍💻 Author

**Jędrzej Kłosowski**  
GitHub: [@Jedrzej-Klosowski](https://github.com/Jedrzej-Klosowski)

---

## 💬 FAQ

**Q: Are passwords stored securely?**  
A: Yes, all passwords are hashed using bcrypt with 10 salt rounds before being stored in the database. 

**Q: How do I contribute to this project?**  
A: Fork the repository, create a feature branch, make your changes, and submit a Pull Request! 

**Q: Is this production-ready?**  
A:  This is a learning/demonstration project. For production, implement additional security features like JWT, HTTPS, rate limiting, and session management.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!   
Feel free to check the [issues page](https://github.com/Jedrzej-Klosowski/Login-system/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">

**Thank you for checking out this project!  ⭐**

If you like this project, please consider giving it a star on GitHub! 

[⬆ Back to Top](#-login-system)

</div>
