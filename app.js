var express = require('express'),
    routes = require('./routes'),
    config = require('./config'),
    http = require('http'),
    app = express();

app.configure(function(){
    app.set('port', config.port);
    app.engine('html', require('atpl').__express);
    app.set('view engine', 'html');
    app.set('view cache', false);
    app.set('views', __dirname + '/views');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser(config.cookie_secret));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

if (config.debug) {
    app.use(express.errorHandler());
}

routes(app);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Idakai express server listening on port " + app.get('port'));
});
