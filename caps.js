var request = require('request'),
    _ = require('underscore'),
    _s = require('underscore.string');

module.exports = function get_caps_ratings(symbol, fn) {

    var url = _s.sprintf("http://api.fool.com/caps/ws/json/Ticker/%s&apiKey=cf3d7f4bfeba0786742d5339a527af61", symbol);
    console.log(url);

    request({
        url: url,
        json: true
    }, function(error, response, contents) {

        if (!error && response.statusCode == 200) {
            return fn(null, contents.TickerList.Ticker.Percentile);
        }
    });
};
