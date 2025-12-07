document.getElementById('loginForm').addEventListener('submit', async e => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('email', data.email);
      alert(data.message);
      window.location.href = 'index.html';
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert(err.message || 'Błąd połączenia z serwerem');
    console.error(err);
  }
});
