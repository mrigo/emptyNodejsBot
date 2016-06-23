"use strict";

var helpers = require('../helpers/helpers'),
    events = require('../events/events')

module.exports = {

    sendSimpleMessage: function (chat_id, token, text, callback) {
        events.sendMessage(token, {parse_mode: "HTML", text: text, chat_id: chat_id, reply_markup: JSON.stringify({
                "hide_keyboard": true,
            })
        }, callback);
    },

}