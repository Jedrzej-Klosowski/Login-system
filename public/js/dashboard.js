// On page load, fetch user information
document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('email');

    if (!userId) {
        alert('Please login first');
        window.location.href = 'login.html';
        return;
    }

    try {
        // Fetch user details from the server
        const res = await fetch(`http://127.0.0.1:3000/user/${userId}`);
        const data = await res.json();

        if (res.ok) {
            // Update the page with user information
            document.getElementById('username').textContent = data.username;
            document.getElementById('email').textContent = data.email;
        } else {
            // Fallback to localStorage email if API fails
            document.getElementById('email').textContent = email;
            // Try to extract username from email
            const username = email.split('@')[0];
            document.getElementById('username').textContent = username;
        }
    } catch (err) {
        console.error('Error fetching user:', err);
        // Fallback: use email from localStorage
        document.getElementById('email').textContent = email;
        const username = email.split('@')[0];
        document.getElementById('username').textContent = username;
    }
});

// Logout function
function logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    alert('Logged out successfully');
    window.location.href = 'login.html';
}
