var express = require('express'),
    routes = require('./routes'),
    content = require('./routes/content'),
    snapshot = require('./routes/snapshot'),
    swig = require('swig'),
    path = require('path');

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

// Development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  swig.setDefaults({ cache: false });
}

// Routes
app.get('/', routes.index);
app.get('/snapshot/:symbol', snapshot.index);

// API Endpoints
app.get('/api/sentiments/:symbol', content.sentiments);
//app.get('/api/quotes/:symbol', content.quotes);
app.get('/api/content/:symbol', content.fool);

app.listen(3000, function(){
  console.log('Express server listening on port ' + app.get('port'));
});
