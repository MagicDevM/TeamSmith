import { containsSpaces, isValidEmail } from './validators.js'

let errorTimeout;

export function setError(message) {
  //Clears old timeouts before execution
  clearTimeout(errorTimeout);
  //Gets required imports
  var errorText = document.getElementById('errorText');
  var errorDiv = document.getElementById('errorDiv');
  //Enables the Error screen
  errorDiv.style.display = "flex";
  //Adds error to the error screen
  errorText.textContent = message;
  //If text content is nothing it'll just close the error screen
  if (errorText.textContent === "") {
    errorDiv.style.display = "none"
  }
  
  // Start a new timeout
  errorTimeout = setTimeout(() => {
    errorDiv.style.display = 'none';
    errorText.textContent = '';
  }, 7000);
};

let succTimeout;

export function setSucc(message) {
  //Clears old timeouts before execution
  clearTimeout(succTimeout);
  //Gets required imports
  var succText = document.getElementById('succText');
  var succDiv = document.getElementById('succDiv');
  //Enables the Success screen
  succDiv.style.display = "flex";
  //Adds success to the error screen
  succText.textContent = message;
  //If text content is nothing it'll just close the success screen
  if (succText.textContent === "") {
    succDiv.style.display = "none"
  }
  
  // Start a new timeout
  succTimeout = setTimeout(() => {
    succDiv.style.display = 'none';
    succText.textContent = '';
  }, 7000);
};

export function errorLoggerRegister(username, email, password, confirmPassword, tos) {
  if (!username || !email || !password || !confirmPassword) {
    setError('Please fill in all the required info.');
    return;
  }
  if (username.length < 4) {
    setError('Username must be atleast 4 characters long.');
    return;
  }
  if (!isValidEmail(email)) {
    setError('Email is not valid.');
    return;
  }
  if (containsSpaces(email)) {
    setError('Email is not valid.');
    return;
  }
  if (containsSpaces(password)) {
    setError('Password must not contain spaces.');
    return;
  }
  if (containsSpaces(password)) {
    setError('Password must not contain spaces');
    return;
  }
  if (password.length < 12) {
    setError('Password must be atleast 12 characters long.');
    return;
  }
  if (password !== confirmPassword) {
    setError('Password does not match.');
    return;
  }
  if (!tos.checked) {
    setError('You must agree with our terms of service.');
    return;
  }
  setError('')
  return true;
}