
var request = require('request'),
    _  = require('underscore'),
    _s = require('underscore.string');

module.exports = function get_quotes(symbol, startDate, endDate, fn){

    var url = _s.sprintf("http://api.fool.com/quotes/tmf/v1/historical?symbols=NASDAQ:%s&startDate=%s&endDate=%s&apiKey=cf3d7f4bfeba0786742d5339a527af61", symbol, startDate, endDate);
    console.log(url);

    request({url:url, json:true}, function (error, response, contents) {

        if (!error && response.statusCode == 200) {
            return fn(null, contents.chartInfos[0].historicalQuotes);
        }
    });
};



