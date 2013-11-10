var fool_content = require('../fool.js'),
    get_sentiments = require('../psychsignal.js'),
    get_quotes = require('../quotes.js');

exports.fool = function(req, res){
    fool_content(req.params.symbol, function(err, contents){

        res.json(contents);

    });

};

exports.sentiments = function(req, res){
	get_sentiments(req.params.symbol, req.query.startDate, req.query.endDate, function(err, contents){

        res.json(contents);

    });

};

exports.quotes = function(req, res){
    get_quotes(req.params.symbol, req.query.startDate, req.query.endDate, function(err, contents){

        res.json(contents);

    });

};
