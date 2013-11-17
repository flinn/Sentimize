var getSentiments = require('../psychsignal'),
    getFoolContent = require('../fool'),
    getQuotes = require('../quotes').get_quotes,
    getTweets = require('../stocktwits').get_tweets,
    getTweetWordCount = require('../stocktwits').get_word_counts;

exports.index = function(req, res) {
    var data = {};
    var callbackCounter = 0;

    getSentiments(req.params.symbol, '2013-08-01', '2013-11-15', function(err, contents) {
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

    getQuotes(req.params.symbol, '20130801', '20131115', function(err, contents) {

        data.quotes = contents;

        callbackCounter++;

        if (callbackCounter == 5) {

            res.render('snapshot', {
                data: data,
                pagename: "NewsFeed"
            });
        }
    });

    getFoolContent(req.params.symbol, function(err, contents) {
        data.foolcontents = contents;

        callbackCounter++;

        if (callbackCounter == 5) {

            res.render('snapshot', {
                data: data,
                pagename: "NewsFeed"
            });
        }
    });

    getTweets(req.params.symbol, function(err, contents) {
        data.tweets = contents;

        callbackCounter++;

        if (callbackCounter == 5) {

            res.render('snapshot', {
                data: data,
                pagename: "NewsFeed"
            });
        }
    });

    getTweetWordCount(req.params.symbol, function(err, contents) {
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
