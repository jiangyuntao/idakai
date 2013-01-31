var EventProxy = require('eventproxy'),
    models = require('../models'),
    Page = models.Page;

exports.index = function(req, res) {
    var render = function(page) {
        res.render('site/index', {
            page: page
        });
    }

    var proxy = EventProxy.create('page', render);

    Page.find(1).success(function(page) {
        proxy.emit('page', page);
    });
};
