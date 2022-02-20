const getUserData = require('../services/getUserData');

module.exports = {
  async index(req, res) {
    const { userId } = req.cookies

    const user = await getUserData(userId);

    if (!userId) {
      res.render('index', { user: { name: "" } });
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
}