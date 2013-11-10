var request = require('request'),
    _  = require('underscore'),
    _s = require('underscore.string');

module.exports = function get_trending_symbol(fn){

    var url = _s.sprintf("https://api.stocktwits.com/api/2/streams/trending.json");

    request({url:url, json:true}, function (error, response, contents) {

        if (!error && response.statusCode == 200) {
            var final_symbols = [];

            contents.messages.forEach(function(message){
                message.symbols.forEach(function(symbol){
                    final_symbols.push(symbol.symbol);
                });
            });

            return fn(null, {symbols: _.uniq(final_symbols)});
        }
    });
};
