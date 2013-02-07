var eventproxy = require('eventproxy'),
    crypt = require('../libs/crypt'),
    models = require('../models'),
    User = models.User;

exports.home = function(req, res) {
    res.render('i/home');
};

exports.avatar = function(req, res) {
    res.render('i/avatar');
};

exports.profile = function(req, res) {
    var method = req.method.toLowerCase();

    if (method == 'get') {
        return res.render('i/profile');
    } else if (method == 'post') {
        var password = req.body.password;
        var email = req.body.email.trim();

        User.find(res.locals.auth.id).success(function(user) {
            if (password) {
                user.password = crypt.md5(password);
            }

            if (email) {
                user.email = email;
            }

            user.save().success(function(user) {
                res.render('i/profile', { success: '修改资料成功，2秒后重新登录' });
                return;
            }).error(function(err) {
                res.render('i/profile', { error: '修改资料失败' });
                return;
            });
        });
    }
};

exports.groups = function(req, res) {
    res.render('i/groups');
};
