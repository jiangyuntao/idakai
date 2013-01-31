var site = require('./controllers/site');
var auth = require('./controllers/auth');
var i = require('./controllers/i');
var group = require('./controllers/group');
var topic = require('./controllers/topic');

module.exports = function(app) {
    app.get('/', site.index);

    app.get('/signup', auth.signup);
    app.post('/signup', auth.signup);
    app.get('/signin', auth.signin);
    app.post('/signin', auth.signin);
    app.get('/signout', auth.signout);
    app.get('/cpatcha', auth.captcha);

    app.get('/i/home', i.home);
    app.get('/i/avatar', i.avatar);
    app.get('/i/profile', i.profile);

    app.get('/g/:id', group.detail);
    app.get('/t/:id', topic.detail);
};
