document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const password = document.getElementById('password').value;

  // Hardcoded password (replace with a secure method in production)
  const correctPassword = 'moskee123'; // Change this to your desired password

  if (password === correctPassword) {
    // Store login state in session storage
    sessionStorage.setItem('loggedIn', 'true');
    // Redirect to the volunteer page (vrijwilliger.html)
    window.location.href = '/vrijwilliger.html';
  } else {
    // Show error message
    document.getElementById('error-message').style.display = 'block';
  }
});