const userId = localStorage.getItem('userId');
const modal2 = new bootstrap.Modal(document.getElementById('modalFinalizarDia'), {
  keyboard: false
})

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

function finalizarDia() {
  fetch('/finalizar')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      modal2.show()

      document.querySelector('#diaAtual').innerHTML = data.dia
      document.querySelector('#totalPedidos').value = data.total
      document.querySelector('#finalizados').value = data.concluidas
      document.querySelector('#cancelados').value = data.canceladas
      document.querySelector('#continuar').addEventListener('click', () => modal2.hide());
      document.querySelector('#close').addEventListener('click', () => modal2.hide());
    })
}