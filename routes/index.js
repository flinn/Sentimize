var _ = require('underscore'),
    async = require('async'),
    loadSentiments = require('../psychsignal'),
    loadCapsRatings = require('../caps'),
    loadCurrentPrice = require('../quotes').get_current_price,
    loadTrendingSymbols = require('../stocktwits').get_trending_symbol;

exports.index = function(req, res) {

  var myStocks = ['MSFT', 'AAPL', 'NFLX', 'SBUX', 'GOOG', 'KOL'];
  var model = {};

  async.concat(myStocks, get_data, function(err, results) {

    var rows = [];

    results.forEach(function(result) {

      var idea_count = Math.floor((Math.random() * 30) + 1);

      var sentimetric = (Math.random() * 9) + 1;
      var real_sentimetric = sentimetric.toFixed(2);

      var caps_star_count = parseInt(10, result.capsRatings);
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
        "symbol": result.symbol,
        "idea_num": idea_count,
        "sentimetric": real_sentimetric,
        "price": result.price,
        "cap_stars": caps_stars,
        "non_cap_stars": non_caps_stars,
        "bullish": result.sentiments.bullish[0].value,
        "bearish": result.sentiments.bearish[0].value,
      };

      rows.push(row);
    });

    model.stocks = _.sortBy(model.stocks, function(row) {
      return row['sentimetric'];
    });

    model.stocks = rows.reverse();

    loadTrendingSymbols(function(err, trendingsymbols) {

      res.render('index', {
        data: model,
        symbols: trendingsymbols
      });

    });

  });

  function get_data(symbol, callback) {

    console.log("Get data for =>" + symbol);

    async.parallel({

      symbol: function(callback) {
        callback(null, symbol);
      },

      sentiments: function(callback) {

        loadSentiments(symbol, '2013-07-01', '2013-10-31', function(err, sentiments) {

          callback(null, sentiments);
        });
      },

      price: function(callback) {

        loadCurrentPrice(symbol, function(err, price) {

          callback(null, price);
        });
      },

      capsRatings: function(callback) {

        loadCapsRatings(symbol, function(err, ratings) {

          callback(null, ratings);

        });
      }

    }, function(err, results) {

      callback(null, results);

    });
  }
};
