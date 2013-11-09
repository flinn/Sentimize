var request = require('request'),
    _  = require('underscore'),
    _s = require('underscore.string');

module.exports = function get_sentiments(symbol, startDate,endDate, fn){

    var url = _s.sprintf("https://psychsignal.com/api/sentiments?api_key=41910b4ec81feab42407b3270cb629d0&symbol=%s&from=%s&to=%s&period=d", symbol, startDate, endDate);

    request({url:url, json:true}, function (error, response, contents) {
        if (!error && response.statusCode == 200) {

            return fn(null, contents);
        }
    });
};
