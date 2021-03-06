const Product = require('../models/Product');
const User = require('../models/User');
const Categories = require('../models/Category');

const getUserData = require('../services/getUserData');

module.exports = {
  async index(req, res) {
    const { userId } = req.cookies
    const { notAdminError } = req.query;

    const user = await getUserData(userId);

    if (!userId) {
      res.render('index', { user: { name: "", _id: '' }, error: undefined });
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
      const users = await User.find();

      success ?
        res.render('gestao/funcionarios', { user, message: { desc: 'Usuário adicionado com sucesso!', type: 'success' }, users }) :
        res.render('gestao/funcionarios', { user, message: null, users });
    } else if (view === 'produtos') {
      const products = await Product.find();

      success ?
        res.render('gestao/produtos', { user, message: { desc: 'Produto adicionado com sucesso!', type: 'success' }, products }) :
        res.render('gestao/produtos', { user, message: null, products });
    } else if (view === 'salao') {
      const categorias = await Categories.find();

      res.render('gestao/salao', { user, categorias });
    }
  },

  logoff(req, res) {
    res.clearCookie('userId');

    return res.json({ logoff: true });
  },

  async add(req, res) {
    const { view } = req.params;
    const { userId } = req.cookies;
    const { addProduct, addFunc } = req.query;

    const user = await getUserData(userId);

    if (!user || !view) {
      res.redirect('/')
      return;
    }

    if (view === 'produtos') {
      addProduct ?
        res.render('add/addProdutos', { user, error: 'Produto já exite' }) :
        res.render('add/addProdutos', { user, error: undefined });

    } else if (view === 'funcionarios') {
      addFunc ?
        res.render('add/addFuncionario', { user, error: 'Usuário ja existe' }) :
        res.render('add/addFuncionario', { user, error: undefined });
    }
  }
}