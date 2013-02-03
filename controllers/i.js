var eventproxy = require('eventproxy'),
    models = require('../models'),
    Page = models.Page;

exports.home = function(req, res) {
    var render = function(page) {
        res.render('i/home', {
            page: page
        });
    }

    var proxy = eventproxy.create('page', render);

    Page.find(1).success(function(page) {
        proxy.emit('page', page);
    });
};

exports.avatar = function(req, res) {
    var render = function(page) {
        res.render('i/avatar', {
            page: page
        });
    }

    var proxy = eventproxy.create('page', render);

    Page.find(1).success(function(page) {
        proxy.emit('page', page);
    });
};

exports.profile = function(req, res) {
    var render = function(page) {
        res.render('i/profile', {
            page: page
        });
    }

    var proxy = eventproxy.create('page', render);

    Page.find(1).success(function(page) {
        proxy.emit('page', page);
    });
};
