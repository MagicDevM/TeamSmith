import {} from '../utils/passwordViewer.js';
import { setError, setSucc, errorLoggerLogin } from '../utils/../utils/errorHandler.js';

var loginButton = document.getElementById('loginButton');
var googleLoginButton = document.getElementById('loginButtonGoogle');

loginButton.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  if (!errorLoggerLogin(email, password)) return;
  
  fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ email, password }),
    })
    .then(async (response) => {
      if (!response.ok) {
        setError(await response.text());
      }
      else {
        setSucc(await response.text());
        window.location.href = "/home"
      }
    })
    .catch(error => {
      setError(error);
      console.error('Error:', error);
    });
});

googleLoginButton.addEventListener('click', () => {
  window.location.href = "/auth/google"
})