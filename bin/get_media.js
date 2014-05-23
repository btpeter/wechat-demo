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

  // uploadImage
  api.getMedia(conf.media.picture_id, function(err, result){
    console.log(conf.media.picture_id);
    if (err) {
      console.log('=> uploading media')
      api.uploadImage('/home/rbenv/projects/Tulips.jpg', function(err, result){
        if (err) { console.log(err); }
        console.log(result);
      });
    }
    console.log(result);
  });

  // api.uploadVoice()
  // api.uploadVideo()
  // api.uploadThumb()

});
