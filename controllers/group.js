var eventproxy = require('eventproxy'),
    models = require('../models'),
    Page = models.Page;

exports.detail = function(req, res) {
    var render = function(page) {
        res.render('group/detail', {
            page: page
        });
    }

    var proxy = eventproxy.create('page', render);

    Page.find(1).success(function(page) {
        proxy.emit('page', page);
    });
};
