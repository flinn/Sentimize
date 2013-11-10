var load_sentiments = require('../psychsignal.js');

exports.index = function(req, res){

    load_sentiments(req.params.symbol, '2013-07-01', '2013-10-31', function(err, contents){

            console.log(contents);
            res.render('snapshot', {
                data: contents
            });
    });
};
