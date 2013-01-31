var site = require('./controllers/site');
var user = require('./controllers/user');
var i = require('./controllers/i');
var group = require('./controllers/group');
var topic = require('./controllers/topic');

module.exports = function(app) {
    app.get('/', site.index);
    app.get('/signup', user.signup);
    app.get('/signin', user.signin);
    app.get('/signout', user.signout);
    app.get('/i/home', i.home);
    app.get('/i/avatar', i.avatar);
    app.get('/i/profile', i.profile);
    app.get('/g/:id', group.detail);
    app.get('/t/:id', topic.detail);
};
