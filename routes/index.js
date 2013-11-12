var load_sentiments = require('../psychsignal'),
    _ = require('underscore'),
    load_fool_content = require('../fool'),
    load_quotes = require('../quotes'),
    async = require('async'),
    load_trending_symbols = require('../stocktwits').get_trending_symbol;

exports.index = function(req, res) {

  var myStocks = ['MSFT', 'AAPL', 'GOOG', 'SBUX', 'NFLX'];
  var number_of_callbacks = 3;
  var final_data = [];
  var model = {};
  var callbackCounter = 0;

  myStocks.forEach(function(stock){
  	var results = {};

  	async.waterfall([

  		function(callback){
  			results.symbol = stock;

  			load_sentiments(stock, '2013-07-01', '2013-10-31', function(err, contents){

  					results.sentiments = contents;
  					callbackCounter++;
  					callback(null, results);
  			})
  		},
  		function(results, callback) {

  		  load_quotes(stock, '20130701', '20131031', function(err, contents){
  		  		results.quotes = contents;
  		  		callbackCounter++;
  		  		callback(null, results);
  		  })
  		},
  		function(results, callback) {

  		  load_trending_symbols(function(err, contents){
  		  		results.trendingsymbols = contents;

  		  		//model.trendingsymbols = results.trendingsymbols;
  		  		callbackCounter++;
  		  		final_data.push(results);

  		  		callback(null, final_data);
  		  })
  		}
  	], function(err, results){

  			var rows = [];

  			results.forEach(function(result){

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
			        "price": result.quotes[0].close,
			        "cap_stars": caps_stars,
			        "non_cap_stars": non_caps_stars,
			        "bullish": result.sentiments.bullish[0].value,
			        "bearish": result.sentiments.bearish[0].value
			    };

			    rows.push(row);
  			});

  			if (callbackCounter == (myStocks.length * number_of_callbacks)) {

          model.stocks = _.sortBy(model.stocks, function(row){ return row['sentimetric'];});
          model.stocks = rows.reverse();
  				console.log(model.trendingsymbols);
					res.render('index', {data: model});

				}
  	})
  });
};
