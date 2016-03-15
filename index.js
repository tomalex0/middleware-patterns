var express = require('express');
var kraken = require('kraken-js');
var app = express();

app.use(kraken());

var httpProxy = require('http-proxy');

var apiProxy = httpProxy.createProxyServer();

var serverOne = 'http://localhost:8001';

//app.all(["/sub","/sub/*"], function(req, res) {
//    console.log('redirecting to Server1');
//    apiProxy.web(req, res, {target: serverOne},function(e){
//        res.status(404).send('Page Not Found');
//    });
//});


var proxyMiddleware = require('http-proxy-middleware');

var proxy = proxyMiddleware('/sub', {target: serverOne});

app.use(proxy);

app.on('start', function () {
  app.listen(8000).on('listening', function () {
    console.log('[env: %s] listening on %d ...', app.kraken.get('env:env'), this.address().port);
  });
});

