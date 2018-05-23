
const { UserModel } = require('../models');

const getUsers = () => UserModel.find();

module.exports = {
  getUsers,
};
