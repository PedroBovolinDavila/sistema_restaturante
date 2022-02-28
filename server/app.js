require('dotenv').config();

// Imports

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Request = require('./models/Request');

// App init and Config

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

// Open server

io.on('connection', async (socket) => {
  console.log(socket.id);

  const requests = await Request.find();

  socket.emit('anterior', requests)

  socket.on('sendReq', async (data) => {
    const req = await Request.create(data);

    socket.broadcast.emit('reciviedReq', req);
  })
})

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => console.log('Server running on port ' + PORT));