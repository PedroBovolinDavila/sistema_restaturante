const Category = require('../models/Category');

module.exports = {
  async add(req, res) {
    const { desc } = req.body;
    const { redirect } = req.query;

    try {

      const verifyCategory = await Category.findOne({ desc });

      if (verifyCategory) {
        res.json({
          message: 'Categoria já existe'
        });
        return;
      }

      await Category.create({
        desc
      });

      if (redirect === 'produtos') {
        res.redirect('/add/produtos');
      } else if (redirect === 'funcionarios') {
        res.redirect('/add/funcionarios')
      }

    } catch (err) {
      res.json(err);
      console.log(err.message);
    }
  }
}