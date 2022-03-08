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
  },

  async register(req, res) {
    const { name, email, password, isAdmin } = req.body;
    const { filename } = req.file;

    try {

      const verifyUser = await User.findOne({ email });

      if (verifyUser) {
        res.json({
          message: 'Email já cadastrado',
          success: false
        })
        return;
      };

      const newUser = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password),
        isAdmin,
        avatar: filename
      });

      res.json({
        newUser,
        success: true
      })

    } catch (err) {
      res.json({
        err,
        success: false
      })
    }
  },

  async findById(req, res) {
    const { id } = req.params;

    try {

      const user = await User.findById(id);

      if (!user) {
        res.json({
          success: false,
          message: 'Usuário nao encontrado'
        })
        return;
      }

      res.json({
        user,
        success: true
      });

    } catch (err) {
      res.json({
        err,
        success: false
      })
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {

      const deletedUser = await User.findByIdAndDelete(id);

      res.json({
        deletedUser,
        success: true
      });

    } catch (err) {
      res.json({
        err,
        success: false
      })
    }
  },

  async update(req, res) {
    const { name, email, isAdmin } = req.body;
    const { id } = req.params;

    try {

      const updatedUser = await User.findByIdAndUpdate(id, {
        name,
        email,
        isAdmin
      })

      res.json({
        updatedUser,
        success: true
      })

    } catch (err) {
      res.json({
        err,
        success: false
      })
    }

  }
}
