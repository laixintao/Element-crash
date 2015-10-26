
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 3333 });

var Player = function(player,speedX,speedY,shareSpeedX,shareSpeedY,ball){
    this.player = player;
    this.speedX = speedX;
    this.speedY = speedY;
    this.shareSpeedX = shareSpeedX;
    this.shareSpeedY = shareSpeedY;
    this.ball = ball;
};

Player.prototype.toJSON = function(){
    var str;
    str = '{"player":"'+this.player+
        '","speedX":"'+this.speedX+
        '","speedY":"'+this.speedY+
        '","shareSpeedX":"'+this.shareSpeedX+
        '","shareSpeedY":"'+this.shareSpeedY+
        '","ball":"'+this.ball+
        '"}';
    return str;
};

Player.prototype.set_msg = function(player,speedX,speedY,shareSpeedX,shareSpeedY,ball){
    this.player = player;
    this.speedX = speedX;
    this.speedY = speedY;
    this.shareSpeedX = shareSpeedX;
    this.shareSpeedY = shareSpeedY;
    this.ball = ball;
};

var num_players = 0;

var playerA;
var playerB;

wss.on('connection', function connection(ws){

    //使用w3c的onopen实现监听
    //只有先用on再用onopen能正常工作
    //》》》我也不知道为什么
    ws.on('open',function(){
        num_players ++;
       console.log("open...");
        if(num_players == 1){
            playerA = new Player();
        }else if(num_players == 2){
            playerB = new Player();
        }else{
            console.log('reject new player...');
            this.terminate();
        }
    });
    ws.onopen(function(){});

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        var msg_send;
        var tmp = new Array();
        tmp = JSON.parse(message);
        name = tmp['player'];
        if(num_players == 1) {
            msg_send = "wait";
            playerA = new Player(tmp['player'],tmp['speedX'],tmp['speedY'],
                tmp['shareSpeedX'],tmp['shareSpeedY'],tmp['ball']);
            console.log(num_players);
        }else if(num_players == 2 && name != playerA.player) {
            playerB = new Player(tmp['player'],tmp['speedX'],tmp['speedY'],
                tmp['shareSpeedX'],tmp['shareSpeedY'],tmp['ball']);
            console.log(num_players);
            msg_send = '[' + playerA.toJSON() + ',' + playerB.toJSON() + ']';
        }else if(num_players == 2){
            if(name == playerA.player){
                console.log("A move...");
                playerA.set_msg(tmp['player'],tmp['speedX'],tmp['speedY'],
                    tmp['shareSpeedX'],tmp['shareSpeedY'],tmp['ball']);
            }else{
                console.log('B move...');
                playerB.set_msg(tmp['player'],tmp['speedX'],tmp['speedY'],
                    tmp['shareSpeedX'],tmp['shareSpeedY'],tmp['ball']);
            }
            msg_send = '[' + playerA.toJSON() + ',' + playerB.toJSON() + ']';
        }
        console.log(msg_send);
        wss.clients.forEach(function each(client) {
            client.send(msg_send);
        });
    });

    ws.on('close',function close(code,message){
        num_players--;
       console.log('code: '+ code + "... player leave..." + num_players);
    });
});
