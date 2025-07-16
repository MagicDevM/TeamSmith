import {} from '../utils/passwordViewer.js';
import { setError, setSucc, errorLoggerRegister } from '../utils/errorHandler.js';

var registerButton = document.getElementById('registerButton');

registerButton.addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const tos = document.getElementById('tos');
  
  errorLoggerRegister(username, email, password, confirmPassword, tos);
}) 