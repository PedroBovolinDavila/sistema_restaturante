var socket = io('http://192.168.15.9:3333')

const form = document.querySelector('#form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let mesa = document.querySelector('#mesa').value;
  let desc = document.querySelector('#desc').value;
  let adicionais = document.querySelector('#adicionais').value;

  if (!mesa || !desc || !adicionais) return;

  const obj = {
    mesa,
    desc,
    adicionais,
  }

  socket.emit('sendReq', obj);
})

