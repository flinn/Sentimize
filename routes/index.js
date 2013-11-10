exports.index = function(req, res){
	var model = {};
	var stocksList = [];

	var myStocks = ["MSFT","AAPL","SEIC","GOOG","NFLX","DVN","RAX","TSLA","AMEX"];
	
	for(var i=0;i <= myStocks.length -1; i++) 
	{
		var stock = {"rank":i+1,
								"symbol":myStocks[i],
								"idea_num":15,
								"cap_stars": [1,2],
								"non_cap_stars": [3,4,5],
								"bullish":150,
								"bearish":40};

		stocksList.push(stock);
	}

	model.stocks = stocksList; 
  
  res.render('index', {
  	data: model
  });
};

exports.stocks = function(req, res){
	var stocksList = {};
  res.json(stocksList);

};