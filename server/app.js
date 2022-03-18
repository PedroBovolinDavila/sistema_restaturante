require('dotenv').config();

// Imports

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const Request = require('./models/Request');
const Call = require('./models/Call');

// App init and Config

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use('/css', express.static(path.join(__dirname, '..', '/public/css')));
app.use('/audio', express.static(path.join(__dirname, '..', '/public/audio')));
app.use('/js', express.static(path.join(__dirname, '..', '/public/js')));
app.use('/img', express.static(path.join(__dirname, '..', '/public/images')));

app.use(routes);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', '/public/views'));

// MongoDB Connection

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to Database'))
  .catch(err => console.log(err));

// Socket io Config

io.on('connection', async (socket) => {
  const requests = await Request.find();
  const calls = await Call.find();

  socket.emit('anterior', requests)
  socket.emit('anterior2', calls);

  socket.on('sendReq', async (data) => {
    const req = await Request.create(data);

    socket.broadcast.emit('reciviedReq', req);
  })

  socket.on('finalizar', async (data) => {
    const call = await Call.create(data);

    socket.broadcast.emit('finalizados', call);
  })

  socket.on('finishReq', async (data) => {
    const requests = await Request.find();

    socket.broadcast.emit('anterior', requests);
  })

  socket.on('finalizarTudo', async (data) => {
    await Call.deleteOne({ mesa: data });

    socket.broadcast.emit('verificarFinalizacao', data);
  })

  socket.on('chamarAtendente', async (data) => {
    const call = await Call.create(data);

    socket.broadcast.emit('finalizados', call)
  })
})

// Open server

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => console.log('Server running on port ' + PORT));