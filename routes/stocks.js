exports.index = function(req, res) {
    res.render('index', {});
};

exports.my_stocks = function(req, res) {
    var myStocks = ["MSFT", "AAPL", "SEIC", "GOOG", "NFLX", "DVN", "RAX", "TSLA", "AMEX"];
    res.json(myStocks);
};
