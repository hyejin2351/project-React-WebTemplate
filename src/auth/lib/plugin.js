const passportLocalMongoose = require('passport-local-mongoose');

module.exports = function plugin(schema, options) {
  passportLocalMongoose(schema, options);
};
