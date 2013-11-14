var request = require('request'),
    async = require('async'),
    _ = require('underscore'),
    _s = require('underscore.string');

module.exports = function get_fool_content(symbol, cb) {

    async.waterfall([

            function get_instrument(callback) {

                console.log('Get Instrument for ->' + symbol);

                var url = _s.sprintf("http://api.fool.com/quotes/v3/admin/instruments/usa:%s?apikey=J6tv7JMuX6DRTqgWbhFIR8pKEww4YV81", symbol);

                request({
                    url: url,
                    json: true
                }, function(error, response, instrument) {
                    console.log(instrument);
                    if (!error && response.statusCode == 200) {

                        callback(null, instrument);
                    }
                });
            },

            function get_foolContent(instrument, callback) {

                console.log('Got Instrument id ->' + instrument.Id);

                var base_url = "http://api.fool.com/content/Headlines/FindFilteredHeadlinesByInstrumentIds";
                var params = _s.sprintf("?instrumentIds=%s&startingRow=0&endRow=10&primaryProvider=1&providerLimit=5&contentsiteId=1&providers=1", instrument.Id);

                var url = base_url + params;

                request({
                    url: url,
                    json: true
                }, function(error, response, contents) {
                    if (!error && response.statusCode == 200) {

                        callback(null, contents);
                    }
                });
            }
        ],
        function(err, results) {

            return cb(null, results);
        });
};
