var eventproxy = require('eventproxy'),
    crypto = require('crypto'),
    models = require('../models'),
    User = models.User;

exports.signup = function(req, res) {
    var method = req.method.toLowerCase();

    if (method == 'get') {
        return res.render('auth/signup');
    } else if (method == 'post') {
        var username = req.body.username.trim();
        var password = md5(req.body.password);
        var email = req.body.email.trim();

        User.find({
            where: { username: username, email: email }
        }).success(function(user) {
        }).error(function(err) {
            User.build({
                username: username,
                password: password,
                email: email
            }).save()
            .success(function(user) {
            })
            .error(function(err) {
            });
        });

        var proxy = eventproxy.create('page', render);
    }
};

exports.signin = function(req, res) {
    var render = function(page) {
        res.render('auth/signin', {
            page: page
        });
    }

    var proxy = eventproxy.create('page', render);

    Page.find(1).success(function(page) {
        proxy.emit('page', page);
    });
};

exports.signout = function(req, res) {
    var render = function(page) {
        res.render('auth/signout', {
            page: page
        });
    }

    var proxy = eventproxy.create('page', render);

    Page.find(1).success(function(page) {
        proxy.emit('page', page);
    });
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

function md5(str) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    return md5sum.digest('hex');
}
