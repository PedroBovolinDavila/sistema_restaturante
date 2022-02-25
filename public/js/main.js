const userId = document.cookie.split('=')[1];
const buttonMenu = document.querySelector('.toggle-menu');
const dropdown = document.querySelector('.dropdown');

function validateLogin(id) {
  if (!id) {
    window.location.href = '/login';
  }

  fetch(`/users/validate/${id}`, { method: 'post' })
    .then(res => res.json())
    .then(data => {
      if (!data.logged) {
        window.location.href = '/login';
      }
    });

  localStorage.setItem('userId', userId);
}
validateLogin(userId);

function deslogar() {
  document.cookie = 'userId='
  localStorage.removeItem('userId');
  let userId = document.cookie.split('=')[1];
  validateLogin(userId)
}

function showMenu() {
  document.querySelector('#navButton').classList.toggle('is-active');
  document.querySelector('#navbarMenu').classList.toggle('is-active');
}
