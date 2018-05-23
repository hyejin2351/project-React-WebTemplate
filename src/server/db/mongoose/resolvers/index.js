
const { UserModel } = require('../models');

const getUsers = () => {
    return UserModel.find();
}

module.exports = {
    getUsers,
}
