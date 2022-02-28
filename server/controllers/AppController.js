const getUserData = require('../services/getUserData');

module.exports = {
  async index(req, res) {
    const { userId } = req.cookies

    const user = await getUserData(userId);

    if (!userId) {
      res.render('index', { user: { name: "", _id: '' } });
    } else {
      res.render('index', { user })
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

    const user = await getUserData(userId);

    if (!user) res.redirect('/');
    if (!view) res.redirect('/');

    if (view === 'funcionarios') {
      res.render('gestao/funcionarios', { user });
    } else if (view === 'produtos') {
      res.render('gestao/produtos', { user });
    } else if (view === 'salao') {
      res.render('gestao/salao', { user });
    }
  },

  logoff(req, res) {
    res.clearCookie('userId');

    return res.json({ logoff: true });
  },
}