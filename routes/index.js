var load_sentiments = require('../psychsignal'),
  _ = require('underscore'),
  async = require('async'),
  load_fool_content = require('../fool'),
  load_current_price = require('../quotes').get_current_price,
  load_trending_symbols = require('../stocktwits').get_trending_symbol;

exports.index = function(req, res) {

  var myStocks = ['MSFT', 'AAPL', 'GOOG'];
  var model = {};

  async.concat(myStocks, make_requests, function(err, results) {

    var rows = [];

    results.forEach(function(result) {

      var idea_count = Math.floor((Math.random() * 30) + 1);
      var sentimetric = (Math.random() * 9) + 1;
      var real_sentimetric = sentimetric.toFixed(2);
      var caps_star_count = Math.floor((Math.random() * 5) + 1);
      var non_caps_star_count = 5 - caps_star_count;

      var caps_stars = [];
      var non_caps_stars = [];

      for (var z = 1; z <= caps_star_count; z++) {
        caps_stars.push("star");
      }
      for (var y = 0; y < non_caps_star_count; y++) {
        non_caps_stars.push("not");
      }

      var row = {
        "rank": 0,
        "symbol": result.symbol,
        "idea_num": idea_count,
        "sentimetric": real_sentimetric,
        "price": result.price,
        "cap_stars": caps_stars,
        "non_cap_stars": non_caps_stars,
        "bullish": result.sentiments.bullish[0].value,
        "bearish": result.sentiments.bearish[0].value
      };

      rows.push(row);
    });

    model.stocks = _.sortBy(model.stocks, function(row) {
      return row['sentimetric'];
    });

    model.stocks = rows.reverse();

    res.render('index', {
      data: model
    });

  });

  function make_requests(stock, callback) {

    console.log("Get data for =>" + stock);

    var results = {};

    async.waterfall([

      function(callback) {
        results.symbol = stock;

        load_sentiments(stock, '2013-07-01', '2013-10-31', function(err, contents) {

          results.sentiments = contents;

          callback(null, results);
        });
      },

      function(results, callback) {

        load_current_price(stock, function(err, contents) {
          results.price = contents;

          callback(null, results);
        });
      },

      function(results, callback) {

        load_trending_symbols(function(err, contents) {
          results.trendingsymbols = contents;

          callback(null, results);

        });
      }
    ], function(err, results) {

          callback(null, results);

      });
  }
};
