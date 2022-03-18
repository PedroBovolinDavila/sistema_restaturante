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
  },

  async add(req, res) {
    const { mesa, product: { nome, preco, quantidade } } = req.body;

    try {

      const verifyMesa = await Cart.findOne({ mesa });

      if (!verifyMesa) {
        res.json({
          err: 'Mesa não encontrada',
          success: false
        });

        return;
      }

      const newCart = await Cart.updateOne({ mesa }, {
        $push: {
          products: {
            nome,
            preco,
            quantidade
          }
        }
      })

      res.json({
        newCart,
        success: true
      });

    } catch (err) {
      res.json({
        err,
        success: false
      })
    }
  },

  async findByMesa(req, res) {
    const { mesa } = req.params;

    try {

      const cart = await Cart.findOne({ mesa });

      res.json({
        cart,
        success: true
      });

    } catch (err) {
      res.json({
        err,
        success: false
      });
    }
  },

  async delete(req, res) {
    const { mesa } = req.params;

    try {

      const deletedCart = await Cart.deleteOne({ mesa });

      res.json({
        deletedCart,
        success: true
      })

    } catch (err) {
      res.json({
        err,
        success: false
      })
    }
  }
}