var request = require('request'),
    _ = require('underscore'),
    _s = require('underscore.string');


exports.get_trending_symbol = function(fn) {

    var url = _s.sprintf("https://api.stocktwits.com/api/2/trending/symbols.json");
    console.log(url);

    request({
        url: url,
        json: true
    }, function(error, response, contents) {

        if (!error && response.statusCode == 200) {
            var final_symbols = [];

            contents.symbols.forEach(function(symbol) {
                final_symbols.push(symbol.symbol);
            });

            return fn(null, _.uniq(final_symbols));
        }
    });
};

exports.get_tweets = function(symbol, fn) {

    var url = _s.sprintf("https://api.stocktwits.com/api/2/streams/symbol/%s.json", symbol);

    request({
        url: url,
        json: true
    }, function(error, response, contents) {

        if (!error && response.statusCode == 200) {
            var tweets = [];

            contents.messages.forEach(function(message) {
                tweets.push(message);
            });

            return fn(null, tweets);
        }
    });
};


exports.get_word_counts = function(symbol, fn) {

    var url = _s.sprintf("https://api.stocktwits.com/api/2/streams/symbol/%s.json", symbol);

    request({
        url: url,
        json: true
    }, function(error, response, contents) {

        if (!error && response.statusCode == 200) {

            var uselessList = [
                "the", "of", "to", "and", "a", "in", "is", "it", "an", "no", "says", "than", "more", "also",
                "you", "that", "he", "was", "for", "on", "are", "always", "a7", "put", "why", "gets", "how", "if",
                "with", "as", "I", "his", "they", "be", "at", "one", "still", "will",
                "have", "this", "from", "or", "had", "by", "but", "i", "not", "only",
                "a", "b", "c", "s", "3", "4", "5", "does", "any", "oi", "has", "the", "too", "may", "just",
                "some", "what", "there", "we", "can", "out",
                "other", "were", "all", "your", "when", "my"
            ];

            var tweets = [];
            var wordCounts = [];

            contents.messages.forEach(function(message) {
                var tweet = message.body.toLowerCase();

                var words = tweet.split(" ");

                words.forEach(function(word) {
                    if (!_.contains(uselessList, word)) {

                        var re = /^[a-z0-9]+$/i;

                        if (re.test(word)) {


                            var wordObj = _.first(_.where(wordCounts, {
                                word: word
                            }));

                            if (wordObj === null || wordObj === undefined) {
                                wordCounts.push({
                                    word: word,
                                    count: 1
                                });
                            } else {

                                wordCounts = _.without(wordCounts, wordObj);

                                wordObj['count'] = wordObj['count'] + 1;

                                wordCounts.push(wordObj);
                            }
                        }

                    }
                });
            });

            wordCounts = _.sortBy(wordCounts, function(word) {
                return word['count'];
            });

            return fn(null, _.first(wordCounts.reverse(), [10]));
        }
    });
};
