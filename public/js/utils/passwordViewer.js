var passwordIcon = document.querySelectorAll('.passwordIcon');
var passwordInput = document.getElementById('password');
var confirmPasswordInput = document.getElementById('confirmPassword');
passwordIcon.forEach((icon, index) => {
  icon.addEventListener('click', function() {
    if (index === 0) {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text': 'password';
      passwordInput.setAttribute('type', type);  
    }
    else {
      const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      confirmPasswordInput.setAttribute('type', type);
    }
    this.classList.toggle('bx-eye-slash');
    this.classList.toggle('bx-eye');
  });
});
