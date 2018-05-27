
module.exports = UserModel => (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  
  const { _id } = req.body;
  if (!_id) {
    return res.status(401).end();
  }

  return UserModel.findByIdAndDelete(_id, (err) => {
    if (err) return res.status(401).end();
    return next();
  });
};
