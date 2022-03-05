const Product = require('../models/Product');

module.exports = {
  async create(req, res) {
    const { nome, desc, preco } = req.body;
    const { filename } = req.file;

    try {

      await Product.create({
        nome,
        desc,
        preco,
        image: filename
      })

      res.redirect('/gestao/produtos?success=true');

    } catch (err) {
      res.redirect('/gestao/produtos?success=false');
    }
  }
}