const Cart = require('../models/Cart');

module.exports = {
  async create(req, res) {
    const { numMesa } = req.body;

    try {

      const verifyCart = await Cart.findOne({
        mesa: numMesa
      })

      if (verifyCart) {
        res.json({
          message: 'Mesa ja cadastrada',
          success: false
        })
        return;
      };

      const newCart = await Cart.create({
        mesa: numMesa
      });

      res.json({
        newCart,
        message: 'Carrinho criado com sucesso',
        success: true
      });

    } catch (err) {
      res.json({
        err,
        success: false
      })
    }
  }
}