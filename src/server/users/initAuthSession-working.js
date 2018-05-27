
/*import cookieParser from 'cookie-parser';
import session from 'express-session';

module.exports = (server) => {
  server.use(cookieParser('mysecret'));
  server.use(session({
    secret: 'mysecret',
    resave: false,
    rolling: true,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // Requires https: secure: false
  }));

  server.use(passport.session());

  server.post('/login', (req, res, next) => {
    req.session.returnTo = req.body.goto;
    next();
  }, 
  passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login?how=unsuccessful',
  },
  ));

  server.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
        
  server.post('/register', async (req, res, next) => {
    if (!req.user) {
      try {
        await User.registerUser({
          id: req.body.id,
          password: req.body.password,
        });
        req.session.returnTo = `/user?id=${req.body.id}`;
      } catch (err) {
        req.session.returnTo = `/login?how=${err.code}`;
      }
    } else req.session.returnTo = '/login?how=user';
    next();
  }, passport.authenticate(
    'local',
    {
      successReturnToOrRedirect: '/',
      failureRedirect: '/login?how=unsuccessful',
    },
  )
  );
};
*/
