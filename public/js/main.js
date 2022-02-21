const userId = document.cookie.split('=')[1];
const buttonMenu = document.querySelector('.toggle-menu');
const dropdown = document.querySelector('.dropdown');

function validateLogin(id) {
  if (!id.trim()) {
    window.location.href = '/login';
  }

  fetch(`/users/validate/${id}`, { method: 'post' })
    .then(res => res.json())
    .then(data => {
      if (!data.logged) {
        window.location.href = '/login';
      } else if (!data.user.isAdmin) {
        window.location.href = '/public'
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
  dropdown.classList.toggle('hide');
}
