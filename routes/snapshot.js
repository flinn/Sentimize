var load_sentiments = require('../psychsignal'),
    load_fool_content = require('../fool'),
    load_quotes = require('../quotes').get_quotes,
    load_tweets = require('../stocktwits').get_tweets,
    load_tweet_word_count = require('../stocktwits').get_word_counts;

exports.index = function(req, res){
    var data = {};
    var callbackCounter = 0;

    load_sentiments(req.params.symbol, '2013-07-01', '2013-10-31', function(err, contents){
        data.symbol = contents.symbol;

        data.sentiments = contents;

        callbackCounter++;

        if (callbackCounter == 5) {
            res.render('snapshot', {
                data: data,
                pagename: "NewsFeed"
            });
        }
    });

    load_quotes(req.params.symbol, '2013-07-01', '2013-10-31', function(err, contents){
        data.quotes = contents;

        callbackCounter++;

        if (callbackCounter == 5) {
            res.render('snapshot', {
                data: data,
                pagename: "NewsFeed"
            });
        }
    });

    load_fool_content(req.params.symbol, function(err, contents){
        data.foolcontents = contents;

        callbackCounter++;

        if (callbackCounter == 5) {
            res.render('snapshot', {
                data: data,
                pagename: "NewsFeed"
            });
        }
    });

    load_tweets(req.params.symbol, function(err, contents){
        data.tweets = contents;

        callbackCounter++;

        if (callbackCounter == 5) {
            res.render('snapshot', {
                data: data,
                pagename: "NewsFeed"
            });
        }
    });

    load_tweet_word_count(req.params.symbol, function(err, contents){
        data.tweetwordcount = contents;

        callbackCounter++;

        if (callbackCounter == 5) {
            res.render('snapshot', {
                data: data,
                pagename: "NewsFeed"
            });
        }
    });
};
