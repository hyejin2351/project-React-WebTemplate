const mongoose = require('mongoose');
const modAuth = require('./plugin');

const {
  USERNAME_FIELD_NAME,
  PASSWORD_FIELD_NAME,
  SALT_LENGTH
} = require('../config');

// define the User model schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  name: String,
  roles: {
    type: [{
      type: String,
      enum: ['user', 'admin']
    }],
    default: ['user'],
    required: 'Please provide at least one role'
  }
});

UserSchema.virtual('id')
  .get(function rename() {
    return this._id.toHexString();
  });

UserSchema.plugin(modAuth, {
  usernameField: USERNAME_FIELD_NAME,
  passwordField: PASSWORD_FIELD_NAME,
  saltlen: SALT_LENGTH,
});

module.exports = mongoose.model('User', UserSchema);
