const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json()); // Parsowanie JSON z żądań
app.use(express.static(path.join(__dirname, 'public'))); // Serwowanie plików statycznych
app.use(cors()); // Zezwolenie na żądania z innych domen

// Endpoint rejestracji użytkownika
app.post('/register', async (req, res) => {
  // console.log('Headers:', req.headers);
  console.log('req.body:', req.body); // Debugowanie danych wejściowych
  console.log('📥 POST /register wywołany!');
  const { username, email, password } = req.body;
  // Sprawdzenie czy użytkownik już istnieje
  const userExists = await User.findOne({ username, email });
  if (userExists) return res.status(400).json({ message: 'Użytkownik już istnieje' });

  // Haszowanie hasła
  const hashedPassword = await bcrypt.hash(password, 10);
  // Tworzenie nowego użytkownika
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.json({ message: 'Zarejestrowano pomyślnie' });
});

// Endpoint logowania
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // Szukanie użytkownika po emailu
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Błędne dane' });

  // Weryfikacja hasła
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: 'Błędne dane' });
  // Blokowanie konta po 5 nieudanych próbach logowania
  if (user.security && user.security.accountLocked) {
    const lockUntil = user.security.lockUntil;
    if (lockUntil && lockUntil > Date.now()) {
      return res.status(403).json({ message: 'Konto zablokowane. Spróbuj ponownie później.' });
    }
  }
  });
/*
  // Generowanie tokena JWT
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
*/
/*
// Middleware do sprawdzania tokena JWT
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Brak tokena' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: 'Nieprawidłowy token' });
  }
}
*/
// Chroniona trasa dostępna tylko po zalogowaniu
app.get('/welcome', verifyToken, (req, res) => {
  res.json({ message: `Witaj, ${req.user.email}`, user: req.user });
});

// Połączenie z bazą danych MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/MyDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Połączono z MongoDB'))
  .catch(err => console.error('❌ Błąd połączenia z MongoDB', err));

// Start serwera
app.listen(3000, () => {
  console.log('🌍 Serwer działa na http://localhost:3000');
});

