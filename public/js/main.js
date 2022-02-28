const userId = localStorage.getItem('userId');

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
}

validateLogin(userId)

function deslogar() {
  localStorage.removeItem('userId');
  const userId = localStorage.getItem('userId');
  document.cookie = 'userId=false;'
  validateLogin(userId);
}