require('dotenv').config();

// Imports

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');
const cookieParser = require('cookie-parser');

// App init and Config

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/css', express.static(path.join(__dirname, '..', '/public/css')));
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

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log('Server running on port ' + PORT));