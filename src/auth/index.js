
module.exports = require('./lib/init');

module.exports.plugin = require('./lib/plugin');

module.exports.register = require('./lib/middleware/register');
module.exports.unregister = require('./lib/middleware/unregister');

module.exports.login = require('./lib/middleware/login');
module.exports.logout = require('./lib/middleware/logout');

module.exports.validateToken = require('./lib/middleware/validateToken');
