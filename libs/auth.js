var crypt = require('../libs/crypt'),
    config = require('../config');

module.exports = function(req, res, next) {
    if (req.cookies.auth != undefined) {
        var auth = JSON.parse(crypt.decrypt(req.cookies.auth, config.cookie_secret));
        res.locals.auth = auth;
    }
    return next();
};
