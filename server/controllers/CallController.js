const Call = require('../models/Call');

module.exports = {
  async create(req, res) {
    const { mesa, tipo } = req.params;
    const { preco } = req.body;

    try {

      const verifyCall = await Call.findOne({ mesa, tipo });

      if (verifyCall) {
        res.json({
          success: false,
          message: 'Você já tem um chamado aberto'
        });
        return;
      }

      const newCall = await Call.create({
        mesa,
        tipo,
        preco: preco ? preco : 0
      });

      res.json({
        newCall,
        success: true
      })

    } catch (err) {
      res.json({
        message: err,
        success: false
      })
    }
  },

  async findById(req, res) {
    const { id } = req.params;

    try {

      const call = await Call.findById(id);

      res.json({
        call,
        success: true
      })

    } catch (err) {
      res.json({
        message: err,
        success: false
      })
    }
  }
}