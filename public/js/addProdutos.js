const categoryContainer = document.querySelector('#categoria');

function addCategoria() {
  const novaCategoria = document.querySelector('#novaCategoria').value;

  if (!novaCategoria.trim()) return

  fetch('/categorias/create', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      desc: novaCategoria
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) document.location.reload();
      else alert('Erro ao cadastrar, tente novamente');
    });
}

function createOption(text) {
  const dataHTML = `<option value="${text}">${text}</option>`
  categoryContainer.innerHTML += dataHTML;
}

function load() {
  categoryContainer.innerHTML = '<option selected>Informe uma categoria</option>';

  fetch('/categorias')
    .then(res => res.json())
    .then(data => {
      data.map(categoria => createOption(categoria.desc));
    })
}

load();