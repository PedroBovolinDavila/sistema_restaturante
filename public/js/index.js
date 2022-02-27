const table = document.querySelector('#table-data-add');
const body = document.querySelector('body');
let length;

const audio = document.createElement('audio');
audio.src = '/audio/sino.mp3';
body.appendChild(audio);
body.addEventListener('load', () => {
  alert('Clique na tela para autorizar notificações');
  playAudio();
});

const fakeData = [
  {
    id: 1,
    mesa: 14,
    desc: '1 xtudo - 1 xsalada - 1 xbacon',
    adicionais: 'xtudo sem cebola'
  },
  {
    id: 2,
    mesa: 16,
    desc: '1 xtudo - 1 xsalada - 1 xbacon',
    adicionais: 'xtudo sem cebola'
  },
  {
    id: 3,
    mesa: 3,
    desc: '1 xtudo - 1 xsalada - 1 xbacon',
    adicionais: 'xtudo sem cebola'
  },
  {
    id: 4,
    mesa: 24,
    desc: '1 xtudo - 1 xsalada - 1 xbacon',
    adicionais: 'xtudo sem cebola'
  },
  {
    id: 5,
    mesa: 13,
    desc: '1 xtudo - 1 xsalada - 1 xbacon',
    adicionais: 'xtudo sem cebola'
  },
]

const createTableData = (pedido) => {
  const data = document.createElement('tr');
  const dataHTML = `
  <th scope="row">${pedido.mesa}</th>
  <td>${pedido.desc}</td>
  <td>${pedido.adicionais}</td>
  `

  data.id = pedido.id;
  data.innerHTML = dataHTML;

  table.appendChild(data);
}

const playAudio = () => {
  audio.play();
}

const getDataAndUpdate = () => {
  length = table.innerHTML.length;
  table.innerHTML = '';

  fakeData.map(data => {
    createTableData(data)
  })

  if (table.innerHTML.length > length) {
    console.log('tem novo');
    playAudio()
  }
}
getDataAndUpdate()

const newData = {
  id: 3333,
  mesa: 27,
  desc: 'fdabio',
  adicionais: '123321'
}

setTimeout(() => fakeData.push(newData), 10000);
setTimeout(() => fakeData.push(newData), 20000);
setTimeout(() => fakeData.push(newData), 30000);
setTimeout(() => fakeData.push(newData), 40000);
setInterval(() => getDataAndUpdate(), 1500);