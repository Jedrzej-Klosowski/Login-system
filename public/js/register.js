document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword')
  };

  if (data.password !== data.confirmPassword) {
    alert('Hasła się nie zgadzają!');
    return;
  }
  try {
    const res = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password
      })
    });
    const result = await res.json();
    alert(result.message);
    if (res.ok) {
      window.location.href = 'dashboard.html';
    }
  } catch (err) {
    alert(err.message || 'Wystąpił błąd podczas rejestracji.');
    console.error(err);
  }
});