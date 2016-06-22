"use strict";

var request = require('request');

module.exports = {

    receivedMessage: function(event) {
        var senderID = event.sender.id;
        var recipientID = event.recipient.id;
        var timeOfMessage = event.timestamp;
        var message = event.message;

        console.log("Received message for user %d and page %d at %d with message:",
            senderID, recipientID, timeOfMessage);
        console.log(JSON.stringify(message));

        var messageId = message.mid;

        // You may get a text or attachment but not both
        var messageText = message.text;
        var messageAttachments = message.attachments;

        if (messageText) {
            this.sendTextMessage(senderID, messageText);
        } else if (messageAttachments) {
            this.sendTextMessage(senderID, "Message with attachment received");
        }
    },

    sendTextMessage: function (recipientId, messageText) {
        // For the recipient you can choose an id or even a phone number with the 'phone_number' key
        var messageData = {
            recipient: {
              id: recipientId
            },
            message: {
              text: messageText
            }
        };

        this.callSendAPI(messageData);
    },

    callSendAPI: function(messageData) {
        request({
            uri: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: process.env.FB_PAGE_ACCESS_TOKEN },
            method: 'POST',
            json: messageData
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var recipientId = body.recipient_id;
                var messageId = body.message_id;

                console.log("Successfully sent generic message with id %s to recipient %s",
                messageId, recipientId);
            } else {
                console.error("Unable to send message.");
                console.error(response);
                console.error(error);
            }
        });
    },

};
