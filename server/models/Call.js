const mongoose = require('mongoose');

const CallSchema = new mongoose.Schema({
  mesa: {
    type: Number,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  preco: {
    type: mongoose.Types.Decimal128,
  },
})

module.exports = mongoose.model('Call', CallSchema);