const Product = require('../models/Product');
const User = require('../models/User');
const getUserData = require('../services/getUserData');

module.exports = {
  async index(req, res) {
    const { userId } = req.cookies
    const { notAdminError } = req.query;

    const user = await getUserData(userId);

    if (!userId) {
      res.render('index', { user: { name: "", _id: '' }, });
    } else {
      notAdminError ?
        res.render('index', { user, error: 'Você não tem permições suficientes.' }) :
        res.render('index', { user, error: undefined })

    }
  },

  login(req, res) {
    const { err } = req.query;

    if (!err) {
      res.render('login', { error: false, message: '' });
    } else {
      res.render('login', { error: true, message: 'Email ou senha incorretos' });
    }
  },

  async gestao(req, res) {
    const { view } = req.params;
    const { userId } = req.cookies;
    const { success } = req.query;

    const user = await getUserData(userId);

    if (!userId || !view) {
      res.redirect('/')
      return
    }

    if (!user.isAdmin) {
      res.redirect('/?notAdminError=true');
      return
    }

    if (view === 'funcionarios') {
      res.render('gestao/funcionarios', { user });
    } else if (view === 'produtos') {
      const products = await Product.find();

      success ?
        res.render('gestao/produtos', { user, message: { desc: 'Produto adicionado com sucesso!', type: 'success' }, products }) :
        res.render('gestao/produtos', { user, message: null, products });
    } else if (view === 'salao') {
      res.render('gestao/salao', { user });
    }
  },

  logoff(req, res) {
    res.clearCookie('userId');

    return res.json({ logoff: true });
  },

  async add(req, res) {
    const { view } = req.params;
    const { userId } = req.cookies;

    const user = getUserData(userId);

    if (!user || !view) {
      res.redirect('/')
      return;
    }

    if (view === 'produtos') {
      res.render('add/produtos', { user });
    } else if (view === 'funcionarios') {
      res.render('add/funcionarios', { user })
    }

  }
}