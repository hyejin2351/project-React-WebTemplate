//
// init express
//
const TAG = 'app:express';
const d = require('debug')(TAG);

const express = require('express');
const morgan = require('morgan');
const {
  isDev,
} = require('./');


module.exports = ({
  server,     // express app
  docRootDir, // should be absolute path
} = {}) => {
  if (!server) {
    d('creating express app');
  }
  const svr = server || express();  

  // logging util
  svr.use(morgan(isDev ? 'dev' : 'prod'));

  // static file service
  if (docRootDir) {
    d('docRoot is ', docRootDir);
    svr.use(express.static(docRootDir));
  }

  return svr;
};
