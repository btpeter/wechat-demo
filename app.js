var fs = require('fs'),
    yaml = require('js-yaml'),
    express = require('express'),
    wechat = require('wechat'),
    bodyParser = require('body-parser');
var app = express();

var API = require('wechat').API;
var conf, menuStr, DEBUG;

// config
try {
  conf = yaml.safeLoad(fs.readFileSync('./conf.yml', 'utf-8'));
} catch (e) {
  console.log(e);
}

menuStr = fs.readFileSync('./menu.json', 'utf-8');
DEBUG = conf.debug;

// middleware
app.use(bodyParser.urlencoded());


// wechat common api
var api = new API(conf.wechat.appid, conf.wechat.appsecret);
api.getAccessToken(function(err, result){
  if (err) { console.log(err); }
  DEBUG && console.log(result);
  // wechat menu
  api.getMenu(function(err, result){
    if (err) { console.log(err); }
    if (!result) {
      api.createMenu(menuStr, function(err, result){
        if (err) { console.log(err); }
        DEBUG && console.log('menu created: ', result);
      });
    }
    // if (result.menu) {
    //   api.removeMenu(function(err, result){
    //     console.log('menu deleted:', result);
    //   });
    // }
  });
});


// wechat message api
app.use('/nodejs/wechat', wechat('hellowechat', function(req, res, next){

  var message = req.weixin;
  // console.log('From' + message.FromUserName);
  // console.log('To: ' + message.ToUserName);
  var type = message.MsgType;
  switch(type){
    case 'text':
      res.reply('Hello text.');
      break;
    case 'event':
      if (message.EventKey === "DEMO_001") {
      res.reply('Hello my first event!');
    } else {
      res.reply('Hello event: ' + message.EventKey);
    }
      break;
    default: 
      res.reply('Hello wechat demo!');
  }

}));


// test path /nodejs
app.get('/nodejs', function(req, res){
  res.send('Hello Express.js!');
});

app.listen(conf.server.port, function(){
  console.log("listening on port %d", conf.server.port);
});

// app.enable('trust proxy');
