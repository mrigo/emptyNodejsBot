"use strict";

var express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    _ = require('underscore');

var helpers = require('./helpers/helpers'),
    tg_commands = require('./telegram/commands'),
    messenger = require('./messenger/messenger'),
    nlp = require('./nlp/nlp');

/**
 *
 * If you want to add analytics just uncomment these lines
 *
 * var ua = require('universal-analytics');
 * var visitor = ua(process.env.GA_KEY);
 *
 * // How to track a view
 * visitor.pageview("/your-bot", "YourBotName", "http://telegram.me/YourBotName").send();
 *
 */

/**
 * process.env.TELEGRAM_BOT_TOKEN = Your Telegram bot token
 */

var app = express(),
    telegram_token = process.env.TELEGRAM_BOT_TOKEN,
    port = process.env.PORT || 8888 ;

/**
 * Middleware that only parses json
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/***********************
 * FACEBOOK MESSENGER
 ***********************/

/**
 * GET request from FB to authorize your app
 * process.env.FB_VALIDATION_TOKEN = Token created from you and set in your FB page settings
 */
app.get('/fb', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === process.env.FB_VALIDATION_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});

/**
 * POST request from FB when users send you a message
 */

app.post('/fb', function (req, res) {
    if (req.body.entry && req.body.entry.length>0) {
        var messaging_events = req.body.entry[0].messaging;
        for (var i = 0; i < messaging_events.length; i++) {
            var event = req.body.entry[0].messaging[i];
            var sender = event.sender.id;
            if (event.message && event.message.text) {
                var text = event.message.text;
                //messenger.sendTextMessage(sender, "Text received, echo: " + text)
            }
        }
    }
    res.sendStatus(200);
});


/***********************
 * TELEGRAM
 ***********************/

/**
 * POST request from TELEGRAM when users send you a message
 */

app.post("/telegram", function(req, res) {

    var chat_id = req.body.message.chat.id,
        user_text = req.body.message.text;

    var username = req.body.message.chat.username;

    switch (helpers.messageType(req)) {
        case 'text':
            if (helpers.isCommand(user_text)) {
                //tg_commands.sendSimpleMessage(chat_id, telegram_token, "Welcome "+user.info.telegram_username+"!");
            } else {
                //tg_commands.sendSimpleMessage(chat_id, telegram_token, "Welcome "+user.info.telegram_username+"!");
            }
            break;
        case 'location':
            var longitude = location.longitude;
            var latitude = location.latitude;
        break;

    };

    res.sendStatus(200);

});


app.listen(port);
console.log('Server running with love on port ' + port);