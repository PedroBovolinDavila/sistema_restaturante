const User = require('../models/User');

module.exports = async (userId) => {
  try {

    const user = await User.findById(userId);

    return user.isAdmin ? true : false;

  } catch (err) {
    return false;
  }
}