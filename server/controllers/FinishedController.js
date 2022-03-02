const Finished = require('../models/Finished');
const Request = require('../models/Request');

module.exports = {
  async add(req, res) {
    const { reqId } = req.params;

    try {

      const request = await Request.findById(reqId);
      await Request.findByIdAndDelete(reqId);
      const newFinished = await Finished.create({
        mesa: request.mesa,
        desc: request.desc,
        adicionais: request.adicionais
      });

      res.json(newFinished);

    } catch (err) {
      res.json(err);
    }
  },

  async finishDay(req, res) {
    try {

      const requests = await Request.find();
      await Request.deleteMany();

      res.json(requests);

    } catch (err) {
      res.json(err);
    }
  }
}