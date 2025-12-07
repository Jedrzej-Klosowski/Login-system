const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json()); // Parsowanie JSON z żądań
app.use(express.static(path.join(__dirname, '..', 'public'))); // Serwowanie plików statycznych
app.use(cors()); // Zezwolenie na żądania z innych domen

// Endpoint rejestracji użytkownika
app.post('/register', async (req, res) => {
  try {
    console.log('req.body:', req.body); // Debugowanie danych wejściowych
    console.log('📥 POST /register wywołany!');

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Brak wymaganych pól' });
    }

    // Walidacja długości hasła
    if (password.length < 6) {
      return res.status(400).json({ message: 'Hasło musi mieć co najmniej 6 znaków' });
    }

    // Sprawdzenie czy użytkownik już istnieje
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) return res.status(400).json({ message: 'Użytkownik już istnieje' });

    // Haszowanie hasła
    const hashedPassword = await bcrypt.hash(password, 10);
    // Tworzenie nowego użytkownika
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).json({ message: 'Zarejestrowano pomyślnie' });
  } catch (err) {
    console.error('Błąd rejestracji:', err);
    return res.status(500).json({ message: 'Błąd serwera' });
  }
});

// Endpoint logowania
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Brak wymaganych pól' });
    }

    // Szukanie użytkownika po emailu
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Błędne dane' });

    // Weryfikacja hasła
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Błędne dane' });

    return res.status(200).json({ message: 'Zalogowano pomyślnie', userId: user._id, email: user.email });
  } catch (err) {
    console.error('Błąd logowania:', err);
    return res.status(500).json({ message: 'Błąd serwera' });
  }
});

// Połączenie z bazą danych MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/MyDB', {
  serverSelectionTimeoutMS: 5000, // Timeout po 5 sekundach
  connectTimeoutMS: 5000
}).then(() => {
  console.log('✅ Połączono z MongoDB');
  // Start serwera tylko po połączeniu z bazą
  app.listen(3000, () => {
    console.log('🌍 Serwer działa na http://localhost:3000');
  });
}).catch(err => {
  console.error('❌ Błąd połączenia z MongoDB:', err.message);
  console.error('Upewnij się, że MongoDB jest uruchomione na mongodb://127.0.0.1:27017');
  process.exit(1); // Zakończ proces jeśli baza się nie połączy
});

