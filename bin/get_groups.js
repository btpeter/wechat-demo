var fs = require('fs');
var yaml = require('js-yaml');
var API = require('wechat').API;
var conf;

// config
try {
  conf = yaml.safeLoad(fs.readFileSync('../config/conf.yml', 'utf-8'));
} catch (e) {
  console.log(e);
}

// var
menuStr = fs.readFileSync('../config/menu.json', 'utf-8');
DEBUG = conf.debug;

// wechat common api
var api = new API(conf.wechat.appid, conf.wechat.appsecret);
api.getAccessToken(function(err, result){
  if (err) { console.log(err); }
  DEBUG && console.log(result);
  // get followers
  api.getGroups(function(err, result){
    if (err) { console.log(err); }
    DEBUG && console.log(result);
    var filteredGroups = result.groups.filter(function(group){
      return group.name === '测试组'
    });
    if (filteredGroups.length === 0){
      console.log('=> creating group')
      api.createGroup('测试组', function(err, result){
        if (err) { console.log(err); }
        DEBUG && console.log(result);
      });
    }
  });
});
