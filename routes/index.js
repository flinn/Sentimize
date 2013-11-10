var load_sentiments = require('../psychsignal'),
    load_fool_content = require('../fool'),
    load_quotes = require('../quotes'),
    async = require('async'),
    load_trending_symbols = require('../stocktwits').get_trending_symbol;

exports.index = function(req, res) {
  
  var myStocks = ["MSFT", "AAPL", "GOOG"];
  var final_data = [];

  myStocks.forEach(function(stock){
  	
  	var results = {};

  	async.waterfall([

  		function(callback){
  			results.symbol = stock;

  			load_sentiments(stock, '2013-07-01', '2013-10-31', function(err, contents){

  					results.sentiments = contents;
  					callback(null, results);
  			})
  		},
  		function(results, callback) {

  		  load_quotes(stock, '2013-07-01', '2013-10-31', function(err, contents){
  		  		results.quotes = contents;
  		  		callback(null, results);
  		  })
  		},
  		function(results, callback) {

  		  load_trending_symbols(function(err, contents){
  		  		results.trendingsymbols = contents;
  		  		final_data.push(results);

  		  		callback(null, final_data);
  		  })
  		}
  	], function(err, results){
  			
  			var rows = [];

  			results.forEach(function(result){
					
					var idea_count = Math.floor((Math.random() * 30) + 1);

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

			    // console.log(results.sentiments);

			    var row = {
			    		"rank": 0,
			        "symbol": result.symbol,
			        "idea_num": idea_count,
			        "sentimetric": 5,
			        "price": result.quotes[0].LastClose,
			        "cap_stars": caps_stars,
			        "non_cap_stars": non_caps_stars,
			        "bullish": result.sentiments.bullish[0].value,
			        "bearish": result.sentiments.bearish[0].value
			    };

			    rows.push(row);
  			});

		    console.log(rows);

		    res.render('index', {data: rows});
  	});
  });
	
};