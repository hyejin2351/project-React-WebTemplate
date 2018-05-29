//
// connect mongodb
//
const d = require('debug')('app:mongoose');

const mongoose = require('mongoose');

module.exports = (uri, options) => new Promise((resolve, reject) => {
  // See http://mongoosejs.com/docs/connections.html#options
  // const {
  //      user, pass, autoIndex, dbName, ...
  //      autoIndex, poolSize, ...
  // } = options;

  const connPromise = mongoose.connect(uri, options);
  connPromise.then(() => resolve(mongoose.connection), err => reject(err))
    .catch((err) => {
      console.error('>>>>>>>>>>>>>>>>>>>>>>', err);
      return reject(err);
    });
});
