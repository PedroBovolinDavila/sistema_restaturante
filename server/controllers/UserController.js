const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
  async validate(req, res) {
    const { id } = req.params;

    if (!id) return res.json({ logged: false })

    try {

      const user = await User.findById(id);

      if (!user) return res.json({ logged: false })

      return res.status(200).json({ user, logged: true });

    } catch (err) {
      return res.json({ logged: false })
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.redirect('/login?err=true');

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) return res.redirect('/login?err=true');

    // res.cookie('userId', user._id)
    res.cookie('userId', user._id.toString());

    return res.redirect('/');
  }
}
