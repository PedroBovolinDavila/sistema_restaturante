const users = document.querySelectorAll('.userTable');
const userModal = new bootstrap.Modal(document.querySelector('#userModal'), {
  keyboard: false
})

for (let i = 0; i < users.length; i++) {
  users[i].addEventListener('click', e => {
    const id = e.target.id;

    if (!id) {
      alert('Erro ao carregar ID, atualize a pagina e tente novamente');
      return
    }

    fetch(`/users/${id}`)
      .then(res => res.json())
      .then(data => {
        document.querySelector('#user').innerHTML = data.user.name;
        document.querySelector('#userNome').value = data.user.name;
        document.querySelector('#userEmail').value = data.user.email;
        document.querySelector('#userAdmin').value = data.user.isAdmin;
        document.querySelector('#userImage').src = `/img/${data.user.avatar}`;

        userModal.show();

        document.querySelector('#btnDeletar').addEventListener('click', () => {
          fetch(`/users/delete/${id}`)
            .then(res => res.json())
            .then(data => {
              if (data.success) {
                document.location.reload();
                alert(`Usuário ${data.deletedUser.name} excluido com sucesso`);
              } else {
                alert('Erro ao excluir usuario, tente novamente');
              }
            });
        })

        document.querySelector('#btnSalvar').addEventListener('click', () => {
          const newName = document.querySelector('#userNome').value;
          const newEmail = document.querySelector('#userEmail').value
          const newAdmin = (document.querySelector('#userAdmin').value === 'true');

          if (!newName.trim() || !newEmail.trim()) {
            alert('Informe todos os dados');
            return;
          }

          fetch(`/users/update/${id}`, {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: newName,
              email: newEmail,
              isAdmin: newAdmin
            })
          })
            .then(res => res.json())
            .then(data => {
              if (data.success) {
                document.location.reload();
                alert(`Usuario ${data.updatedUser.name} atualizado com sucesso`);
              } else {
                alert('Erro ao atualizar usuario, atualize a pagina e tente novamente');
              }
            })
        })
      });
  })
}