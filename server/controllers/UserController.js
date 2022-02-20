const User = require('../models/User');

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
  }
}