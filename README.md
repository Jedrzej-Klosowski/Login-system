# Login System

A simple, full-stack web application for user registration and login, using **Node.js** (Express) and **MongoDB** for the backend, and **JavaScript**, **HTML**, **CSS** for the frontend. This app demonstrates secure user authentication with password hashing and basic form validation.

---

## 🚀 Features

- **User Registration**: Create a new account with username, email, and password (minimum 6 characters).
- **Login**: Authenticate with email and password.
- **Password Hashing**: User passwords are securely hashed using bcrypt before storage.
- **MongoDB Integration**: All user data is persisted to MongoDB.
- **Responsive UI**: Clean, modern design, accessible on mobile and desktop.
- **Error Handling**: Friendly error messages for invalid logins, registration issues, and server/database errors.

---

## 🛠️ Tech Stack

- **Frontend**:
  - JavaScript (55%)
  - HTML (35.6%)
  - CSS (9.4%)
- **Backend**:
  - Node.js & Express
  - MongoDB (via mongoose)
  - bcrypt for password hashing
  - cors for cross-origin requests

---

## 📦 Folder Structure

```
/public
  /src        # HTML/CSS files
  /js         # Frontend JS for login/register
/server
  /models     # Mongoose User model
  /routes     # Express routes for authentication
  server.js   # Main backend server
```

---

## 🔗 Third-Party Dependencies

- [`express`](https://expressjs.com/): HTTP server & routing
- [`mongoose`](https://mongoosejs.com/): MongoDB object modeling
- [`bcryptjs`](https://www.npmjs.com/package/bcryptjs): Password hashing
- [`cors`](https://www.npmjs.com/package/cors): Cross-origin support

---

## ⚡ Quickstart

### Prerequisites

- Node.js & npm installed.
- MongoDB running locally (`mongodb://127.0.0.1:27017/MyDB`).

### Installation

```bash
git clone https://github.com/Jedrzej-Klosowski/Login-system.git
cd Login-system
npm install
```

### Running the App

```bash
# Start the server (from repo root)
node server/server.js
```

The app runs at `http://localhost:3000`.

---

## 📝 Usage

1. Visit the website and choose **Register** to create a new account.
2. After registering, login with your details.
3. Successful login sets `userId` and `email` in browser's localStorage.
4. Incorrect credentials or duplicate usernames/emails will show user-friendly alerts.

---

## 🧩 Example Code

**Frontend JS Login:**  
```javascript
document.getElementById('loginForm').addEventListener('submit', async e => {
  // ...
  const res = await fetch('http://127.0.0.1:3000/login', { ... });
  // ...
});
```

**Backend Registration:**  
```javascript
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  // Check for existing user, hash password, save
});
```

---

## ⚙️ Configuration

- Change MongoDB connection in `server/server.js` if using a remote DB.
- Static files served from `/public` directory.
- Environment variables can be added for advanced setups.

---

## 📄 License

Currently unlicensed. See repository for more info.

---

## 👤 Author

[Jędrzej Kłosowski](https://github.com/Jedrzej-Klosowski)

---

## 🌟 Demo Screenshots

- ![Login Form](public/src/login.html)
- ![Register Form](public/src/register.html)

---

## 🗃️ API Endpoints

- `POST /register`: Registers a user.
- `POST /login`: Authenticates a user.

See source for details.

---

## 🙋 FAQ

- **Password security?** All passwords are hashed using bcrypt.
- **Error feedback?** Server and client alert users about all major problems.

---

**For questions or issues, please open an issue in this repository!**
