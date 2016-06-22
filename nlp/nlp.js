"use strict";

var natural = require('natural');

var classifier = new natural.BayesClassifier(),
    tokenizer = new natural.WordTokenizer();

var word_filters = ['him', 'her', 'nope', 'fuck']

/**
 * Associate a list of keywords to a specific purpouse and train the classifier
 */

classifier.addDocument(['keywords'], 'purpouse');
classifier.train();

module.exports = {

    understandUserAction: function(user_action, callback){
        if (callback)
            callback(classifier.classify(user_action));
    },

    tokenize: function(user_action, callback) {
        var tokens = tokenizer.tokenize(user_action);
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            // Calculate a Jaro Winkler Distance between two words, from 0 to 1 (float)
            // var distance = natural.JaroWinklerDistance(token, "word");
        }
        if (callback)
            callback();
    }

}

