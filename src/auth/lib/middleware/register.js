
function validateUserData({
  email, password, name
}) {
  if (!email || !password || !name) return null;

  name = name.trim();
  email = email.trim();
  password = password.trim();

  // more... validation

  return {
    name,
    email,
    password,
  };
}

module.exports = UserModel => (req, res, next) => {
  // login user can't register
  if (req.headers.authorization) {
    return res.status(400).end();
  }
  const userData = validateUserData(req.body);
  if (!userData) {
    return res.status(400).end();
  }

  const user = new UserModel(userData);
  return UserModel.register(new UserModel(userData), userData.password, (err) => {
    if (err) return res.status(400).end();
    return next();
  });
};
