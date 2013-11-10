var get_fool_content = require('../fool'),
    get_sentiments = require('../psychsignal'),
    get_trending_symbol = require('../stocktwits').get_trending_symbol,
    get_tweets = require('../stocktwits').get_tweets,
    get_word_counts = require('../stocktwits').get_word_counts,
    get_quotes = require('../quotes');

exports.fool = function(req, res){
    get_fool_content(req.params.symbol, function(err, contents){

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

exports.trendingSymbols = function(req, res){
    get_trending_symbol(function(err, contents){

        res.json(contents);
    });
};

exports.tweets = function(req, res){
    get_tweets(req.params.symbol, function(err, contents){

        res.json(contents);
    });
};

exports.tweetWordCount = function(req, res){
    get_word_counts(req.params.symbol, function(err, contents){

        res.json(contents);
    });
};
