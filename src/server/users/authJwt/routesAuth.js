//
// debug
const d = require('debug')('app:auth');

const express = require('express');
const jwt = require('jsonwebtoken');

const login = require('./middleware/login');

module.exports = ({
  AUTH_JWT_SECRET,
  routePath,
}) => {
  const router = new express.Router();

  router.post(routePath.login, login, (req, res) => {
    const { user } = req;
        
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'login failure'
      });
    }

    // create payload
    const payload = {
      sub: user._id
    };

    // create a token string with payload
    const token = jwt.sign(payload, AUTH_JWT_SECRET);
        
    const data = {
      name: user.name
    };

    return res.json({
      success: true,
      message: 'login success',
      token,
      user: data
    });
  });

  return router;
};
