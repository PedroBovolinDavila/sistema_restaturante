const User = require('../models/User');

module.exports = {
  async validate(req, res) {
    const { id } = req.query;

    if (!id) return res.redirect('/login');

    try {

      const user = await User.findById(id);

      if (!user) return res.redirect('/login');

      return res.status(200).json({ user, error: false });

    } catch (err) {
      return res.redirect('/login');
    }
  }
}