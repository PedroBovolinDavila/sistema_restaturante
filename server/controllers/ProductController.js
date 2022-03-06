const Product = require('../models/Product');

module.exports = {
  async create(req, res) {
    const { nome, desc, preco, categoria } = req.body;
    const { filename } = req.file;

    const newPreco = preco.replace(',', '.');

    try {

      const verifyProduct = await Product.findOne({ nome });

      if (verifyProduct) {
        res.redirect('/add/produtos?addProduct=true');
        return
      }

      await Product.create({
        nome,
        desc,
        preco: newPreco,
        categoria,
        image: filename
      })

      res.redirect('/gestao/produtos?success=true');

    } catch (err) {
      // res.redirect('/gestao/produtos?success=false');
      res.json(err)
      console.log(err.message)
    }
  },

  async findById(req, res) {
    const { id } = req.params;

    try {

      const product = await Product.findById(id);

      res.json(product);

    } catch (err) {
      res.json(err);
    }
  }
}