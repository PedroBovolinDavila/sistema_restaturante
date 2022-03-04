var socket = io('http://192.168.15.9:3333')

const body = document.querySelector('body');
const table = document.querySelector('#table-data-add');
const opcModal = new bootstrap.Modal(document.getElementById('modal2'), {
  keyboard: false
})

const audio = document.createElement('audio');
audio.src = '/audio/sino.mp3';
body.appendChild(audio);
body.addEventListener('load', () => {
  alert('Clique na tela para autorizar notificações');
  playAudio();
});

const playAudio = () => {
  audio.play();
}

const createTableData = (pedido) => {
  const data = document.createElement('tr');
  const dataHTML = `
  <th scope="row" id="${pedido._id}">${pedido.mesa}</th>
  <td id="${pedido._id}">${pedido.desc}</td>
  <td id="${pedido._id}">${pedido.adicionais}</td>
  `

  data.id = pedido._id;
  data.addEventListener('click', adicionais)
  data.classList.add('pe-auto');
  data.innerHTML = dataHTML;

  table.appendChild(data);
}

socket.on('reciviedReq', data => {
  createTableData(data);
  playAudio();
})

socket.on('anterior', (data) => {
  table.innerHTML = '';
  for (message of data) {
    createTableData(message);
  }
  playAudio();
})

const AddPedido = () => {
  let mesa = document.querySelector('#numeroMesa').value;
  let desc = document.querySelector('#pedido').value;
  let adicionais = document.querySelector('#adicionais').value;

  if (!mesa || !desc) return;

  const obj = {
    mesa,
    desc,
    adicionais,
  }

  socket.emit('sendReq', obj);

  document.location.reload();
}

function adicionais(e) {
  const id = e.target.id;

  const modalMesa = document.querySelector('#modalMesa');
  const modalNumeroMesa = document.querySelector('#modalNumeroMesa');
  const modalPedido = document.querySelector('#modalPedido');
  const modalAdicionais = document.querySelector('#modalAdicionais');

  fetch(`/pedidos/${id}`)
    .then(res => res.json())
    .then(data => {
      modalMesa.innerHTML = data.mesa
      modalNumeroMesa.value = data.mesa
      modalPedido.value = data.desc
      modalAdicionais.value = data.adicionais
    });

  opcModal.show()

  document.querySelector('#btnCancelar').addEventListener('click', () => {
    fetch(`/finalizar/cancelar/${id}`, { method: 'post' })
      .then(res => res.json())
      .then(data => {
        socket.emit('finishReq', data);
        document.location.reload();
      });
  });
  document.querySelector('#btnSalvar').addEventListener('click', () => {
    const newNumeroMesa = document.querySelector('#modalNumeroMesa').value;
    const newPedido = document.querySelector('#modalPedido').value;
    const newAdicionais = document.querySelector('#modalAdicionais').value;

    if (!newNumeroMesa || !newPedido) return

    fetch(`/pedidos/update/${id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mesa: newNumeroMesa,
        desc: newPedido,
        adicionais: newAdicionais
      })
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) return

        socket.emit('finishReq', data);
        document.location.reload();
      });
  })
  document.querySelector('#btnFinalizar').addEventListener('click', () => {
    fetch(`/finalizar/concluir/${id}`, { method: 'post' })
      .then(res => res.json())
      .then(data => {
        socket.emit('finishReq', data);
        document.location.reload();
      });
  });
}
