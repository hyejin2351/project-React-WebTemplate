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
  nickName: String,
  profileImageURL: {
    type: String,
  },
  roles: {
    type: [{
      type: String,
      enum: ['user', 'admin']
    }],
    default: ['user'],
    required: 'Please provide at least one role'
  },
  providerType: {
    type: String, default: 'local'
  },
  created: { type: Date, default: Date.now },
  facebook: {
    id: { type: String, required: false },
    accessToken: { type: String, required: false },
    providerData: {}
  },
  google: {
    id: { type: String, required: false },
    accessToken: { type: String, required: false },
    providerData: {}
  },
  kakao: {
    id: { type: String, required: false },
    accessToken: { type: String, required: false },
    providerData: {}
  },
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
