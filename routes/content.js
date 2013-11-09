var fool_content = require('../fool.js');
var sentiments = require('../psychsignal.js');

exports.fool = function(req, res){

  fool_content(req.params.symbol, function(err, contents){

    res.render('content', {
        pagename: 'NewsFeed',
        contents: contents
    });

  });

};

exports.sentiments = function(req, res){
	sentiments(req.params.symbol, req.query.startDate, req.query.endDate, function(err, contents){
        res.json(contents);
  });

};
