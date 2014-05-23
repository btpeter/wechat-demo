var fs = require('fs'),
    yaml = require('js-yaml'),
    express = require('express'),
    wechat = require('wechat'),
    bodyParser = require('body-parser');
var app = express();

var API = require('wechat').API;
var conf,  DEBUG;

// config
try {
  conf = yaml.safeLoad(fs.readFileSync('config/conf.yml', 'utf-8'));
} catch (e) {
  console.log(e);
}
console.log(conf);

// var
DEBUG = conf.debug;

// middleware
app.use(bodyParser.urlencoded());

// wechat message api
app.use('/nodejs/wechat', wechat(conf.wechat.apptoken, function(req, res, next){

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
      res.reply('Hello 图片!');
    } else if (message.EventKey === "DEMO_002") {
      res.reply('Hello 文章!');
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
