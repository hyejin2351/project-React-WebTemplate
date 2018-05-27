const mongoose = require('mongoose');
const modAuth = require('./plugin');

const {
  usernameField,
  passwordField,
  saltlen
} = require('../config');

// define the User model schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  name: String
});

UserSchema.virtual('id')
  .get(function rename() {
    return this._id.toHexString();
  });

UserSchema.plugin(modAuth, {
  usernameField,
  passwordField,
  saltlen,
});

module.exports = mongoose.model('User', UserSchema);
