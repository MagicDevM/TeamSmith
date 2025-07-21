import {} from '../utils/passwordViewer.js';
import { errorLoggerLogin } from '../utils/../utils/errorHandler.js';

var loginButton = document.getElementById('loginButton');

loginButton.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  if (!errorLoggerLogin(email, password)) {
    return;
  }
});