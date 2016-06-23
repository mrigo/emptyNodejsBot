"use strict";

var request = require('request');

module.exports = {

    sendMessage: function (token, qs, callback) {
        request({
            url: 'https://api.telegram.org/bot' + token + '/sendMessage',
            method: 'POST',
            qs: qs
        }, function (err, response, body) {

            if (callback)
                callback(response, err);

            if (err)
                console.log("ERROR SENDMESSAGE", err);

        });
    }
};