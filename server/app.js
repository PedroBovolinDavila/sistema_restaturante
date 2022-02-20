require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use('/css', express.static(path.join(__dirname, '..', '/public/css')));
app.use('/js', express.static(path.join(__dirname, '..', '/public/js')));
app.use(routes);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', '/public/views'));

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log('Server running on port ' + PORT));