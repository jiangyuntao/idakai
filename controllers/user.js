var EventProxy = require('eventproxy'),
    models = require('../models'),
    Page = models.Page;

exports.signup = function(req, res){
    var render = function(page) {
        res.render('user/signup', {
            page: page
        });
    }

    var proxy = EventProxy.create('page', render);

    Page.find(1).success(function(page) {
        proxy.emit('page', page);
    });
};

exports.signin = function(req, res){
    var render = function(page) {
        res.render('user/signin', {
            page: page
        });
    }

    var proxy = EventProxy.create('page', render);

    Page.find(1).success(function(page) {
        proxy.emit('page', page);
    });
};

exports.signout = function(req, res){
    var render = function(page) {
        res.render('user/signout', {
            page: page
        });
    }

    var proxy = EventProxy.create('page', render);

    Page.find(1).success(function(page) {
        proxy.emit('page', page);
    });
};
