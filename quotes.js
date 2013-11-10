
var request = require('request'),
    _  = require('underscore'),
    _s = require('underscore.string');

module.exports = function get_quotes(symbol, startDate, endDate, fn){

    var url = _s.sprintf("http://www.xignite.com/xGlobalHistorical.json/GetGlobalHistoricalQuotesRange?Identifier=%s&IdentifierType=Symbol&AdjustmentMethod=None&StartDate=%s&EndDate=%s&_token=f84fe133c5884b8ab4ece26c11c3000e", symbol, startDate, endDate);
    console.log(url);

    request({url:url, json:true}, function (error, response, contents) {

        if (!error && response.statusCode == 200) {
            return fn(null, contents.GlobalQuotes);
        }
    });
};



