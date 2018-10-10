/**
 * Created by jcdev00 on 18. 10. 8.
 */

const log = require('debug')('app:routePassport');

const express = require('express');
const passport = require('passport');

const JSONResponse = require('../../../lib/JSONResponse');

const logUrl = '/users/signin';

module.exports = ({
    routePath,
}) => {
    const router = new express.Router();

    // handle register request
    router.get(routePath.strategy,
        (req, res, next) => {
            var strategy = req.params.strategy;
            log(`strategy, ${strategy}`);

            // Authenticate
            passport.authenticate(strategy)(req, res, next);
        });

    router.get(routePath.facebookCallback,
        passport.authenticate('facebook', { failureRedirect: logUrl }),
        (req, res, next) => {
            // Successful authentication, redirect home.
            res.redirect('/');
        });

    router.get(routePath.googleCallback,
        passport.authenticate('google', { failureRedirect: logUrl }),
        (req, res, next) => {
            // Successful authentication, redirect home.
            res.redirect('/');
        });

    router.get(routePath.kakaoCallback,
        passport.authenticate('kakao', {failureRedirect: logUrl}),
        (req, res, next) => {
            // Successful authentication, redirect home.
            res.redirect('/');
        });

    return router;
};