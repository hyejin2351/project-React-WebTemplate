
class JSONResponse {
  constructor(success, message, props) {
    this.success = success;
    this.message = message;
    if (props) {
      Object.keys(props).forEach((key) => {
        this[key] = props[key];
      });
    }
  }

  send(code) { 
    return (req, res) => JSONResponse.send(code, this)(req, res);
  }
}

JSONResponse.makeResponse = (success, message, data) => new JSONResponse(success, message, data);

JSONResponse.send = (code, ret) => (req, res) => {
  if (req.accepts(['application/json', 'json'])) {
    return res.status(code).json(ret);
  }
  if (ret.goto) {
    return res.redirect(ret.goto);
  }
  return res.status(code).send(ret);
};

JSONResponse.sendSuccess = (code = 200) => (req, res) => JSONResponse.send(code, {
  success: true,
  message: 'ok~'
})(req, res);

JSONResponse.sendInvalidRequest = (code = 400) => (req, res) => JSONResponse.send(code, {
  success: false,
  message: 'Invalid request'
})(req, res);

module.exports = JSONResponse;
