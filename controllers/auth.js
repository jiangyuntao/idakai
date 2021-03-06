var eventproxy = require('eventproxy'),
    utils = require('Sequelize').Utils,
    crypt = require('../libs/crypt'),
    config = require('../config'),
    models = require('../models'),
    User = models.User;

exports.signup = function(req, res) {
    var method = req.method.toLowerCase();

    if (method == 'get') {
        return res.render('auth/signup');
    } else if (method == 'post') {
        var username = req.body.username.trim();
        var password = crypt.md5(req.body.password);
        var email = req.body.email.trim();

        if (username.indexOf('@') != -1) {
            res.render('auth/signup', { error: '用户名中不能包含@字符', username: username, email: email });
            return;
        }

        User.count({
            where: "username=" + utils.escape(username) + " OR email=" + utils.escape(email)
        }).success(function(c) {
            if (c) {
                res.render('auth/signup', { error: '用户名或邮箱已被占用', username: username, email: email });
                return;
            } else {
                User.create({
                    username: username,
                    password: password,
                    email: email
                })
                .success(function(user) {
                    var auth = crypt.encrypt(JSON.stringify({
                        id: user.id,
                        username: user.username,
                        password: user.password,
                        email: user.email,
                        avatar: user.avatar
                    }), config.cookie_secret);
                    res.cookie('auth', auth);

                    res.render('auth/signup', { success: '注册成功，2秒后自动跳转', username: username, email: email });
                    return;
                })
                .error(function(err) {
                    res.render('auth/signup', { error: '注册失败，再试一次吧', username: username, email: email });
                    return;
                });
            }
        });
    }
};

exports.signin = function(req, res) {
    var method = req.method.toLowerCase();

    if (method == 'get') {
        return res.render('auth/signin');
    } else if (method == 'post') {
        var username = req.body.username.trim();
        var password = req.body.password;

        if (username.indexOf('@') == -1) {
            var condition = { username: username };
        } else {
            var condition = { email: username };
        }

        User.find({ where: condition }).success(function(user) {
            if (user == null) {
                res.render('auth/signin', { error: '用户不存在', username: username });
                return;
            }

            if (crypt.md5(password) == user.password) {
                var auth = crypt.encrypt(JSON.stringify({
                    id: user.id,
                    username: user.username,
                    password: user.password,
                    email: user.email,
                    avatar: user.avatar
                }), config.cookie_secret);

                if (req.body.remember) {
                    // cookie 保存1年
                    res.cookie('auth', auth, { maxAge: 1000*60*60*24*365 });
                } else {
                    res.cookie('auth', auth);
                }

                res.redirect('/i/home');
                return;
            } else {
                res.render('auth/signin', { error: '密码错误', username: username });
                return;
            }
        });
    }
};

exports.signout = function(req, res) {
    res.clearCookie('auth');
    res.redirect('/signin');
};

exports.auth = function(req, res, next) {
    if (req.cookies.auth != undefined) {
        var auth = JSON.parse(crypt.decrypt(req.cookies.auth, config.cookie_secret));
        res.locals.auth = auth;
    }
    return next();
};

exports.captcha = function(req, res) {
    var canvas = new require('canvas'),
        ctx = canvas.getContext('2d'),
        items = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPRSTUVWXYZ23456789'.split(''),
        captcha = '',
        textColors = ['#FD0', '#6C0', '#09F', '#F30', '#AAA', '#3CC', '#CC0', '#A020F0', '#FFA500', '#A52A2A', '#8B6914', '#FFC0CB', '#90EE90'];

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 100, 30);
    ctx.font = 'bold 30px sans-serif';
    ctx.globalAlpha = .8;

    for (var i = 0; i < 4; i++) {
        var rnd = Math.random();
        var item = Math.round(rnd * (items.length - 1));
        var color = Math.round(rnd * (textColors.length - 1));
        ctx.fillStyle = textColors[color];
        ctx.fillText(items[item], 5 + i * 23, 25);
        captcha += items[item];
    }

    req.session.captcha = captcha.toLowerCase();

    canvas.toBuffer(function(err, buf) {
        res.writeHead(200, { 'Content-Type': 'image/png', 'Content-Length': buf.length });
        res.end(buf);
    });
};
