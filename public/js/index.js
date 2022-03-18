var socket = io(window.location.host)

const body = document.querySelector('body');
const table = document.querySelector('#table-data-add');
const table2 = document.querySelector('#table-data-add2');
const opcModal = new bootstrap.Modal(document.getElementById('modal2'), {
  keyboard: false
})
const modalPedidos = new bootstrap.Modal(document.querySelector('#modalPedidos'), {
  keyboard: false
});

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

  // Botao de cancelar pedido
  document.querySelector('#btnCancelar').addEventListener('click', () => {
    fetch(`/finalizar/cancelar/${id}`, { method: 'post' })
      .then(res => res.json())
      .then(data => {
        socket.emit('finishReq', data);
        document.location.reload();
      });
  });

  // Botao de salvar pedido
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
  });

  // Botao de finalizar pedido
  document.querySelector('#btnFinalizar').addEventListener('click', () => {
    fetch(`/finalizar/concluir/${id}`, { method: 'post' })
      .then(res => res.json())
      .then(data => {
        socket.emit('finishReq', data);
        document.location.reload();
      });
  });
}

function adicionais2(e) {
  const id = e.target.id;

  if (!id) {
    alert('Erro ao carregar id, atualize a pagina e tente novamente');
    return;
  }

  fetch(`/chamado/${id}`)
    .then(res => res.json())
    .then(data => {
      document.querySelector('#modalPedidosMesa').innerHTML = data.call.mesa;
      modalPedidos.show();

      let btnFinalizar = document.querySelector('#btnLiberar');

      data.call.tipo == 'Pagamento' ?
        btnFinalizar.innerHTML = 'Finalizar' :
        btnFinalizar.innerHTML = 'Concluir'

      document.querySelector('#btnCancelar').addEventListener('click', () => {

      })

      btnFinalizar.addEventListener('click', () => {
        const mesa = data.call.mesa;

        socket.emit('finalizarTudo', mesa);
        document.location.reload();
      })
    })
}

function createData(data) {
  const tr = document.createElement('tr');
  let preco = parseFloat(data.preco.$numberDecimal);

  const dataHTML = `<td id="${data._id}">${data.mesa}</td>
  <td id="${data._id}">${data.tipo}</td>
  <td id="${data._id}">R$ ${preco.toFixed(2)}</td>`

  tr.innerHTML = dataHTML;
  tr.addEventListener('click', adicionais2);
  tr.id = data._id;

  table2.appendChild(tr);
}

socket.on('finalizados', data => {
  createData(data);
  playAudio()
})

socket.on('anterior2', data => {
  table2.innerHTML = ''
  for (call of data) {
    createData(call)
  }
  playAudio()
})
