//
// init mongoose
//
const d = require('debug')('app:mongoose');

const { connect } = require('../db/mongoose');
const {
  MONGODB_URI,
  isDev,
} = require('./');
  
module.exports = (appOptions = {}) => new Promise((resolve, reject) => {
  if ( !MONGODB_URI ) {
    console.error('app:mongoose', 'MONGODB_URI is not defined');
    return reject('MONGODB_URI is not defined');
  }
  const uri = MONGODB_URI;
  // add more options for mongo db connection
  // See http://mongoosejs.com/docs/connections.html#options
  const options = {
    //      user, pass, autoIndex, dbName, ...
    //      autoIndex, poolSize, ...
  };

  connect(uri, options)
    .then((mongoose) => {
      d(`Connected to ${uri}`);
      return resolve(mongoose);
    },
    (err) => {
      d(`Failed while connecting to ${uri}`);
      return reject(err)
    })
    .catch((err) => {
      d(`Exception while connecting to ${uri}`);
      return reject(err)
    });
});
