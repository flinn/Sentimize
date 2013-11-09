var express = require('express'),
    routes = require('./routes'),
    content = require('./routes/content'),
    swig = require('swig'),
    path = require('path'),
    logger = require('tracer').colorConsole();

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('view cache', false);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  swig.setDefaults({ cache: false });
}

// routes
app.get('/', routes.index);

app.get('/contents/:symbol', content.fool);

app.get('/sentiments/:symbol', content.sentiments);


app.listen(3000, function(){
  console.log('Express server listening on port ' + app.get('port'));
});
