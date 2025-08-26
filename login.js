const express = require('express');
const cors = require('cors');
const fs = require('fs'); // do czytania pliku
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));

// GET "/" – zwraca formularz logowania
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// POST "/login" – sprawdza dane logowania
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(`Próba logowania: ${username}, ${password}`);

  // Wczytaj dane z users.json
  const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'), 'utf8'));
  console.log('Użytkownicy: ', users);
  /*
  const username = username.trim();
  const password = password.trim();
  */
  // Znajdź użytkownika o podanym loginie i haśle
  const foundUser = users.find(
    user => user.username === username && user.password === password
  );

  if (foundUser) {
    res.send('Zalogowano poprawnie');
  } else {
    res.send('Błędne dane logowania');
  }
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Wczytaj aktualnych użytkowników
  const users = JSON.parse(fs.readFileSync(path.join(__dirname, "json", 'users.json'), 'utf8'));

  // Sprawdź czy taki użytkownik już istnieje
  const exists = users.some(user => user.username === username);
  if (exists) {
    return res.send('Taki użytkownik już istnieje!');
  }

  // Dodaj użytkownika
  users.push({ username, password });

  // Zapisz z powrotem do pliku
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

  res.send('Użytkownik został dodany!');
});


app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});
