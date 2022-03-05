const Product = require('../models/Product');
const getUserData = require('../services/getUserData');
const verifyAdmin = require('../services/verifyAdmin');

module.exports = {
  async index(req, res) {
    const { userId } = req.cookies
    const { notAdminError } = req.query;

    const user = await getUserData(userId);

    if (!userId) {
      res.render('index', { user: { name: "", _id: '' }, });
    } else {
      notAdminError ?
        res.render('index', { user, error: { message: 'Vocẽ não tem permissoes para acessar essa pagina' } }) :
        res.render('index', { user, error: null })
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
    const isAdmin = await verifyAdmin(userId);

    if (!user || !view) {
      res.redirect('/')
      return
    }

    if (!isAdmin) {
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

    const user = await getUserData(userId);
    const isAdmin = await verifyAdmin(userId);

    if (!user || !view) {
      res.redirect('/')
      return;
    }

    if (!isAdmin) {
      res.redirect('/?notAdminError=true');
      return
    }

    if (view === 'produtos') {
      res.render('add/produtos', { user });
    } else if (view === 'funcionarios') {
      res.render('add/funcionarios', { user })
    }

  }
}