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
  document.cookie = 'userId=false;'
  fetch('/logoff')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.logoff) {
        localStorage.removeItem('userId');
        const userId = localStorage.getItem('userId');
        validateLogin(userId);
      } else {
        console.log('error')
      }
    })

}