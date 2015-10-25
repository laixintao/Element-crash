//var server = require('http').createServer()
//    , url = require('url')
//    , WebSocketServer = require('ws').Server
//    , wss = new WebSocketServer({ server: server })
//    , express = require('express')
//    , app = express()
//    , port = 4080;
//
//app.use(function (req, res) {
//    res.send({ msg: "hello" });
//});
//
//wss.on('connection', function connection(ws) {
//    var location = url.parse(ws.upgradeReq.url, true);
//    // you might use location.query.access_token to authenticate or share sessions
//    // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
//
//    ws.on('message', function incoming(message) {
//        console.log('received: %s', message);
//    });
//
//    ws.send('something');
//});
//
//server.on('request', app);
//server.listen(port, function () { console.log('Listening on ' + server.address().port) });

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 3333 });

wss.on('connection', function connection(ws){
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        wss.clients.forEach(function each(client){
            client.send(message);
        });
    });
});