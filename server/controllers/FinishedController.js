const Finished = require('../models/Finished');
const Request = require('../models/Request');

module.exports = {
  async addConcluida(req, res) {
    const { reqId } = req.params;

    try {

      const request = await Request.findById(reqId);
      await Request.findByIdAndDelete(reqId);
      const newFinished = await Finished.create({
        mesa: request.mesa,
        desc: request.desc,
        adicionais: request.adicionais,
        status: 'Concluido'
      });

      res.json(newFinished);

    } catch (err) {
      res.json(err);
    }
  },

  async addCancelada(req, res) {
    const { reqId } = req.params;

    try {

      const request = await Request.findById(reqId);
      await Request.findByIdAndDelete(reqId);
      const newFinished = await Finished.create({
        mesa: request.mesa,
        desc: request.desc,
        adicionais: request.adicionais,
        status: 'Cancelada'
      });

      res.json(newFinished);

    } catch (err) {
      res.json(err);
    }
  },

  async finishDay(req, res) {
    try {

      await Request.deleteMany();

      const concluidas = await Finished.find({ status: 'Concluido' });
      const canceladas = await Finished.find({ status: 'Cancelada' });

      await Finished.deleteMany();

      const data = new Date();
      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();
      const dataAtual = dia + '/' + mes + '/' + ano;

      res.json({
        concluidas: concluidas.length,
        canceladas: canceladas.length,
        total: concluidas.length + canceladas.length,
        dia: dataAtual
      });

    } catch (err) {
      res.json(err);
    }
  }
}