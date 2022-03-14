var socket = io(window.location.host)

const cardContainer = document.querySelector('#cardcontainer');
const tableContainer = document.querySelector('#salao-pedidos-table');
const salaoModal = new bootstrap.Modal(document.querySelector('#salaoModal'), {
  keyboard: false
});
const salaoModalPedidos = new bootstrap.Modal(document.querySelector('#salaoModalPedidos'), {
  keyboard: false
});

function decremento() {
  document.querySelector('#salaoQuant').value--;
}

function incremento() {
  document.querySelector('#salaoQuant').value++;
}

function onLoad() {
  if (localStorage.getItem('idCarrinho') && localStorage.getItem('numMesa')) {
    document.querySelector('#loading').classList.add('d-none')
    document.querySelector('#cardapio').classList.remove('d-none');

    loadSalao()
  }
}

function filter(filtro) {
  cardContainer.innerHTML = '';

  fetch(`/produtos/categoria/${filtro}`)
    .then(res => res.json())
    .then(data => {
      data.map(produto => createCard(produto))
    })
}

async function showModal(productId) {
  let produto, preco;

  const res = await fetch(`/produtos/${productId}`);
  const data = await res.json();

  if (!data) {
    alert('Erro ao adicionar produto, tente novamente ou chame um atendente');
    return;
  }

  produto = data.nome;
  preco = data.preco.$numberDecimal

  console.log(preco)

  document.querySelector('#salaoImagem').src = `/img/${data.image}`;
  document.querySelector('#salaoNome').innerHTML = produto
  document.querySelector('#salaoProduto').value = produto;

  salaoModal.show();

  document.querySelector('#salaoBtnSalvar').addEventListener('click', async () => {
    let quantidade = document.querySelector('#salaoQuant').value;
    let adicionais = document.querySelector('#salaoAdicionais').value;
    let mesa = localStorage.getItem('numMesa')

    if (!quantidade || !mesa) {
      alert('Erro ao cadastrar produtos, tente novamente ou chame algum funcioanrio ');
      return
    }

    let desc = `${quantidade} ${produto}`;

    let obj = {
      mesa,
      desc,
      adicionais
    }

    const res = await fetch('/cart/add', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mesa,
        product: {
          nome: produto,
          preco,
          quantidade
        }
      })
    })

    const data = await res.json();

    if (!data.success) {
      alert('Erro ao adicionar ao carrinho', + data.err);
      return;
    }

    socket.emit('sendReq', obj);

    document.querySelector('#salaoQuant').value = 1;
    document.querySelector('#salaoAdicionais').value = ''
    addQuery = ''
    produto = '';

    document.location.reload()
  })
}

function loadSalao() {
  cardContainer.innerHTML = '';

  fetch('/produtos')
    .then(res => res.json())
    .then(data => {
      data.map(produto => createCard(produto));
    })
}

function createCard(data) {
  const dataHTML = `<div class="card py-2" style="width: 18rem;">
  <img src="/img/${data.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${data.nome}</h5>
    <p class="card-text">${data.desc}</p>
    <p class="card-text"><strong>R$ ${data.preco.$numberDecimal}</strong></p>
    <a class="btn btn-primary" onclick="showModal('${data._id}')">Comprar</a>
  </div>
</div>`

  cardContainer.innerHTML += dataHTML;
}

function mostrarCardapio() {
  const numMesa = document.querySelector('#inputMesa').value;

  if (localStorage.getItem('idCarrinho')) {
    document.querySelector('#loading').classList.add('d-none')
    document.querySelector('#cardapio').classList.remove('d-none');
    loadSalao()

    return
  }

  if (!numMesa) {
    alert('Informe o numero de sua mesa');
    return;
  }

  fetch('/cart/create', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      numMesa
    })
  })
    .then(res => res.json())
    .then(data => {
      if (!data.success) {
        alert('Erro ao abrir cardapio, tente novamente ou chame um atendente.' + data.message && 'ERRO: ' + data.message);
        return;
      }

      localStorage.setItem('idCarrinho', data.newCart._id);
      localStorage.setItem('numMesa', data.newCart.mesa);

      alert('Seja bem-vindo ao nosso restaurante')

      document.querySelector('#loading').classList.add('d-none')
      document.querySelector('#cardapio').classList.remove('d-none');

      loadSalao()
    })
}

function createTableData(product) {
  const tr = document.createElement('tr');
  const dataHTML = `<tr>
  <td>${product.nome}</td>
  <td>${product.quantidade}</td>
  <td>R$ ${product.preco}</td>
</tr>`

  tr.innerHTML = dataHTML;
  tableContainer.appendChild(tr);
}

function showModalPedidos() {
  const mesa = localStorage.getItem('numMesa');

  fetch(`/cart/${mesa}`)
    .then(res => res.json())
    .then(data => {
      let total = 0;

      if (!data.success) {
        alert('Erro ao achar carrinho, tente novamente ou chame um atendente');
        return;
      }

      tableContainer.innerHTML = '';
      data.cart.products.map(product => {

        createTableData(product)

        let produtoTotal = parseInt(product.quantidade) * parseFloat(product.preco);
        total += produtoTotal;
      });

      document.querySelector('#salaoPedidosMesa').innerHTML = data.cart.mesa
      document.querySelector('#salaoPrecoTotal').innerHTML = `R$ ${total}`;

      salaoModalPedidos.show();

      document.querySelector('#btnFinalizar').addEventListener('click', () => {
        const obj = {
          mesa,
          tipo: 'Pagamento',
          preco: total
        };

        socket.emit('finalizar', obj);
      })
    })
}