//
// debug
const log = require('debug')('app:signin');
const express = require('express');

const register = require('./middleware/register');
const unregister = require('./middleware/unregister');
const JSONResponse = require('../../../lib/JSONResponse');

module.exports = ({
  UserModel,
  routePath,
}) => {
  const router = new express.Router();

  // handle register request
  router.post(routePath.register,
    register(UserModel), 
    (req, res) => {
      log('Registration is successful...');
      const resData = req.body;
      return resData.send(200)(req, res);
    });

  // handle unregister request
  router.post(routePath.unregister, 
    unregister(UserModel), 
    (req, res) => {
      log('Unregistration is successful...');
      return JSONResponse.sendSuccess()(req, res);
    });

  return router;
};
