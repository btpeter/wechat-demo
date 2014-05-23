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

// var
DEBUG = conf.debug;

// middleware
app.use(bodyParser());

// wechat message api
app.use('/nodejs/wechat', wechat(conf.wechat.apptoken).text(function(message, req, res, next){
  console.log('From: ' + message.FromUserName);
  // console.log('To: ' + message.ToUserName);
  res.reply('文本测试中...');

}).image(function(message, req, res, next){
  // TODO
}).voice(function(message, req, res, next){
  // TODO
}).video(function(message, req, res, next){
  // TODO
}).location(function(message, req, res, next){
  // TODO
}).link(function(message, req, res, next){
  // TODO
}).event(function(message, req, res, next){
  var event = message.Event;
  var eventKey = message.EventKey;
  switch(event){
    case 'subscribe':
      res.reply('你好，欢迎订阅我们的微信公众号。\n请点击底部菜单。');
    break;
    case 'CLICK':
      if (eventKey === "DEMO_001") {
      // res.reply({
      //   type: 'image',
      //   content: {
      //     mediaId: "ZTYfRixZsuC_Xl7SGZhH82gcXRAIY3apvhH3-t-tcSHzgZnUKgj2s7fpLd1uEcV2rJ"
      //     }
      //   });
        res.reply('图片测试中...');
      } else if (eventKey === "DEMO_002") {
        res.reply([
          {
            title: '我的文章',
            description: "文章的描述",
            picurl: 'http://www.pengfeiyey.com/assets/showbar.png',
            url: 'http://www.pengfeiyey.com/'
          }
         ]);
      } else {
        res.reply('Hello event: ' + message.EventKey);
      }
    break;
    default:
      res.reply('Hello event!');
  }

}).middlewarify());


// test path /nodejs
app.get('/nodejs', function(req, res){
  res.send('Hello Express.js!');
});

app.listen(conf.server.port, function(){
  console.log("listening on port %d", conf.server.port);
});

// app.enable('trust proxy');
