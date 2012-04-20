
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  http = require('http'),
  everyauth = require('everyauth'),
  jade = require('jade'),
  RedisStore = require('connect-redis')(express);

var app = express();
var redis = require('redis').createClient();

/*
var
  FB_APP_ID = "439348696080450",
  FB_APP_SECRET = "2bd2a04474397f7531515f3326f72dd3";
*/

var 
  FB_APP_ID = "274123879345468";
  FB_APP_SECRET = "9172759b493d13b23c272af638259c47";

everyauth.debug = true;

everyauth.facebook
  .moduleTimeout(9999999999)
  .appId(FB_APP_ID)
  .appSecret(FB_APP_SECRET)
  .scope('user_birthday,user_about_me')
  .findOrCreateUser(function(session, access_token, accessTokExtra, user) {
      session.user = user;
      session.access_token = access_token;
      return user;
  })
  .logoutPath('/logout')
  .handleLogout(function(request, response){
      request.session.user = null;
      request.logout();
      response.redirect('/');
  })
  .redirectPath('/');

//everyauth.helpExpress(app);

//app.register('.html', jade);

app.configure(function(){
  //view stuff
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  //Http and session
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('4234'));

  //Session
  app.use(express.session({
      secret: 'fa8232889ff9323d7ed8368a410a4027',
      store: new RedisStore({ client: redis })
  }));

  app.use(everyauth.middleware());
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));

  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(request, response){
  if (!request.session.user) {
    return response.redirect('/auth/facebook');
  }

  var context = {};

  return response.render('index', context);
});

http.createServer(app).listen(3000);

console.log("Express server listening on port 3000");
