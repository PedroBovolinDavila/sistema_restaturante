const Category = require('../models/Category');

module.exports = {
  async add(req, res) {
    const { desc } = req.body;

    try {

      const verifyCategory = await Category.findOne({ desc });

      if (verifyCategory) {
        res.json({
          message: 'Categoria já existe'
        });
        return;
      }

      const newCategory = await Category.create({
        desc
      });

      res.json({ newCategory, success: true });

    } catch (err) {
      res.json(err);
      console.log(err.message);
    }
  },

  async getAll(req, res) {
    try {

      const categories = await Category.find();

      res.json(categories);

    } catch (err) {
      res.json(err)
      console.log(err.message);
    }
  }
}