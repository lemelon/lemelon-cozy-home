// Generated by CoffeeScript 1.10.0
var application;

process.on('uncaughtException', function(err) {
  console.error(err);
  return console.error(err.stack);
});

application = module.exports = function(callback) {
  var americano, autoStop, initProxy, localization, options, request, setupRealtime, versionChecking;
  americano = require('americano');
  request = require('request-json');
  localization = require('./server/lib/localization_manager');
  initProxy = require('./server/initializers/proxy');
  setupRealtime = require('./server/initializers/realtime');
  versionChecking = require('./server/initializers/updates');
  autoStop = require('./server/lib/autostop');
  options = {
    name: 'Cozy Home',
    port: process.env.PORT || 9103,
    host: process.env.HOST || "127.0.0.1",
    root: __dirname
  };
  return americano.start(options, function(app, server) {
    var market;
    app.server = server;
    if (process.env.NODE_ENV !== "test") {
      initProxy();
    }
    market = require('./server/lib/market');
    market.download(function() {});
    return localization.initialize(function() {
      return setupRealtime(app, function() {
        versionChecking();
        autoStop.init();
        if (callback != null) {
          return callback(app, server);
        }
      });
    });
  });
};

if (!module.parent) {
  application();
}