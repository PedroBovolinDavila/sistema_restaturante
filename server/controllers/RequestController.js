const Request = require('../models/Request');

module.exports = {
  async findAll(req, res) {
    try {
      const requests = await Request.find();

      res.json(requests);
    } catch (err) {
      res.json(err);
    }
  },

  async findById(req, res) {
    const { id } = req.body;

    try {

      const request = await Request.findById(id);

      res.json(request);

    } catch (err) {
      res.json(err);
    }
  },

  async create(req, res) {
    const { mesa, desc, adicionais } = req.body;

    try {

      const newRequest = await Request.create({
        mesa,
        desc,
        adicionais: adicionais ? adicionais : ''
      })

      res.json(newRequest);

    } catch (err) {
      res.json(err);
    }
  }
}