# emptyNodejsBot
An empty structure to create a bot for Telegram and Messenger in NodeJS (Slack coming soon...)

### Requirements

* Node.js (tested with 4.4.1 LTS)
* [Heroku account](https://heroku.com)

### Installation

1. Start by cloning this project
2. Run `$ npm install`

### Usage

1. Edit the code with all you think your bot must do
2. Run `$ npm start`

### Other packages

If you need other dependencies in addition to those already present, just type

`$ npm install <package> --save`

### Heroku deployment

You need an active [Heroku account](https://heroku.com), then you can install heroku-toolbelt.

```
$ brew install heroku-toolbelt
$ heroku login
$ cd *your-app-folder*
```

Create the app and start a Git repository.

```
$ git init
$ git add .
$ git commit -am "starting!"
$ heroku create *app-name*
$ git push heroku master
```

Set some required Config Variables

```
$ heroku config:set TELEGRAM_BOT_TOKEN=<YOUR_TELEGRAM_TOKEN>
$ heroku config:set FB_VALIDATION_TOKEN=<YOUR_FB_VALIDATION_TOKEN>
$ heroku config:set FB_PAGE_ACCESS_TOKEN=<YOUR_FB_PAGE_ACCESS_TOKEN>
```
Remember to set the TELEGRAM_BOT_TOKEN without the word "bot" at the beginning!

If you want to track some info into your Google Analytics account set

```
$ heroku config:set GA_KEY=<YOUR_GOOGLE_ANALYTICS_KEY>
```

# Methods Available

### Messenger Methods

```
var messenger = require('./messenger/messenger');
```

To send a tex message you can use
```
messenger.sendTextMessage(recipientId, messageText, callback(response, err));
```

### Telegram Methods

```
var telegram = require('./telegram/commands');
```

To send a tex message you can use
```
telegram.sendSimpleMessage(chat_id, token, messageText, callback(response, err));
```


# TO DO
- Methods to send more complex messages
- Slack Integration
- Tests

# Thanks to
- [Nicholas Ruggeri](https://medium.com/@nicholasruggeri/storia-di-un-idea-e-di-telegram-che-le-insegnò-a-volare-a6f13428d599#.ltxcyc4i3) for the starting advices on Telegram bots
- [Piervincenzo Madeo](https://github.com/piervix) for the improved README
