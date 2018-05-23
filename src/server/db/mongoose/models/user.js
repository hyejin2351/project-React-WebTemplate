const mongoose = require('mongoose');
// const modAuth = require('mod-auth-jwt');

// define the User model schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  name: String
});

/* UserSchema.plugin(modAuth, {
  usernameField: 'email',
  saltlen: 32,
});
 */
module.exports = mongoose.model('User', UserSchema);
