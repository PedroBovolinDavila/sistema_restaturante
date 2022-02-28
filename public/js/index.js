var socket = io('http://192.168.15.9:3333')

const body = document.querySelector('body');
const table = document.querySelector('#table-data-add');

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
  <th scope="row">${pedido.mesa}</th>
  <td>${pedido.desc}</td>
  <td>${pedido.adicionais}</td>
  `

  data.id = pedido._id;
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