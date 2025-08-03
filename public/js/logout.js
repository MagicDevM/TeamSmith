var logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', () => {
  fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    .then(async (response) => {
      if (response.ok) {
        window.location.href = "/auth/login"
      }
    })
})