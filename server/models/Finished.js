const mongoose = require('mongoose');

const FinishedSchema = new mongoose.Schema({
  mesa: {
    type: Number,
    required: true
  },
  desc: {
    type: String,
    required: true,
  },
  adicionais: {
    type: String,
  },
  status: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Finished', FinishedSchema);