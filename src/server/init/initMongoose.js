//
// init mongoose
//
const d = require('debug')('app:mongoose');

const { connect } = require('../db/mongoose');
  
module.exports = ({ MONGODB_URI, silent }) => new Promise((resolve, reject) => {
  if (!MONGODB_URI) {
    if (!silent) {
      throw new Error('MONGODB_URI is not defined');
    }
  }
  // add more options for mongo db connection
  // See http://mongoosejs.com/docs/connections.html#options
  const options = {
    //      user, pass, autoIndex, dbName, ...
    //      autoIndex, poolSize, ...
  };

  connect(MONGODB_URI, options)
    .then((dbConn) => {
      d(`Connected to ${MONGODB_URI}`);
      return resolve(dbConn);
    },
    (err) => {
      d(`Failed while connecting to ${MONGODB_URI}`);
      return reject(err);
    })
    .catch((err) => {
      d(`Exception while connecting to ${MONGODB_URI}`);
      return reject(err);
    });
});
