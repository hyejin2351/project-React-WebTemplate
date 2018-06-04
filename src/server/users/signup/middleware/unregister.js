const log = require('debug')('app:unregister');

const JSONResponse = require('../../../../lib/JSONResponse');

module.exports = UserModel => (req, res, next) => {
  if (!req.user || !req.user.id) {
    return JSONResponse.sendInvalidRequest(401)(req, res);
  }
  
  const { id } = req.user;

  return UserModel.findByIdAndDelete(id, (err) => {
    if (err) {
      log('!!! error while removing user: ', err);
      return JSONResponse.sendInvalidRequest()(req, res);
    }
    return next();
  });
};
