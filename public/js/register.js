const API_URL = 'https://login-system-backend-bu5v.onrender.com';
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
    alert('Passwords do not match!');
    return;
  }
  try {
    const res = await fetch(`${API_URL}/register`, {
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
      window.location.href = '/src/login.html';
    }
  } catch (err) {
    alert(err.message || 'An error occurred during registration.');
    console.error(err);
  }
});