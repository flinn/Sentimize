var _ = require('underscore'),
  async = require('async'),
  loadSentiments = require('../psychsignal'),
  loadCapsRatings = require('../caps'),
  loadCurrentPrice = require('../quotes').get_current_price,
  loadTrendingSymbols = require('../stocktwits').get_trending_symbol;

exports.index = function(req, res) {

  var model = {};
  var myStocks = ['MSFT', 'AAPL', 'NFLX', 'SBUX', 'GOOG', 'KOL'];

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
        "bullish": _.last(result.sentiments.bullish).value,
        "bearish": _.last(result.sentiments.bearish).value,
      };

      rows.push(row);
    });

    //Final data assignment
    model.stocks = _.sortBy(rows, function(row) {
      return row['sentimetric'] * -1; // Descending sort
    });

    async.parallel({

      symbols: function(callback) {

        loadTrendingSymbols(function(err, trendingsymbols) {
          callback(null, trendingsymbols);
        });
      },

      marketSentiments: function(callback) {

        loadSentiments('Market', '2013-10-01', '2013-11-31', function(err, sentiments) {

          callback(null, {
            "bullish": _.last(sentiments.bullish).value,
            "bearish": _.last(sentiments.bearish).value,
          });
        });
      }

    }, function(err, results) {

      var finalData = _.extend({
        data: model
      }, results);

      res.render('index', finalData);

    });
  });

  function get_data(symbol, callback) {

    console.log("Get data for =>" + symbol);

    async.parallel({

      symbol: function(callback) {
        callback(null, symbol);
      },

      sentiments: function(callback) {

        loadSentiments(symbol, '2013-10-01', '2013-11-31', function(err, sentiments) {

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
