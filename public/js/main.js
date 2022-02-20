let userId = localStorage.getItem('userId');

fetch(`/users/validate/${userId}`, { method: 'post' })
  .then(res => res.json())
  .then(data => {
    if (!data.logged) {
      window.location.href = '/login';
    }
  });