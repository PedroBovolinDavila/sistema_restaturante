const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  preco: {
    type: mongoose.Types.Decimal128,
    required: true
  },
  image: {
    type: String
  }
});

module.exports = mongoose.model('Product', ProductSchema);