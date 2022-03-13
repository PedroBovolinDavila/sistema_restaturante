const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  mesa: {
    type: Number,
    required: true
  },
  products: {
    type: Array
  }
});

module.exports = mongoose.model('Cart', CartSchema);