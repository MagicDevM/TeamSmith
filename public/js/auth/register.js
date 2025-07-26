import {} from '../utils/passwordViewer.js';
import { setError, setSucc, errorLoggerRegister } from '../utils/errorHandler.js';

var registerButton = document.getElementById('registerButton');

registerButton.addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const tos = document.getElementById('tos');
  
  if (!errorLoggerRegister(username, email, password, confirmPassword, tos)) {
    return;
  }
  
  fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username,
        email,
        password
      }),
    })
    .then(async (response) => {
      if (!response.ok) {
        setError(await response.text());
      }
      else {
        setSucc(await response.text());
        window.location.href = "/auth/login"
      }
    })
    .catch(error => {
      setError(error);
      console.error('Error:', error);
    });
});