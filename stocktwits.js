var request = require('request'),
    _  = require('underscore'),
    _s = require('underscore.string');


exports.get_trending_symbol = function (fn){

    var url = _s.sprintf("https://api.stocktwits.com/api/2/trending/symbols.json");

    request({url:url, json:true}, function (error, response, contents) {

        if (!error && response.statusCode == 200) {
            var final_symbols = [];

            contents.symbols.forEach(function(symbol){
                 final_symbols.push(symbol.symbol);
            });

            return fn(null, {symbols: _.uniq(final_symbols)});
        }
    });
};

exports.get_tweets = function (symbol, fn){

    var url = _s.sprintf("https://api.stocktwits.com/api/2/streams/symbol/%s.json", symbol);

    request({url:url, json:true}, function (error, response, contents) {

        if (!error && response.statusCode == 200) {
            var tweets = [];

            contents.messages.forEach(function(message){
                 tweets.push(message);
            });

            return fn(null, {tweets: tweets});
        }
    });
};
