
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 3333 });

function Player(player,speedX,speedY,shareSpeedX,shareSpeedY,ball){
    this.player = player;
    this.speedX = speedX;
    this.speedY = speedY;
    this.shareSpeedX = shareSpeedX;
    this.shareSpeedY = shareSpeedY;
    this.ball = ball;
}



var num_players = 0;

var playerA,playerB;

wss.on('connection', function connection(ws){

    //ws.on('open',function open(){
    //    console.log("new player in..."+num_players);
    //    if(num_players == 0) {
    //        playerA = new Player();
    //        num_players++;
    //    }
    //    else if(num_players == 1) {
    //        playerB = new Player();
    //        num_players++;
    //    }
    //    else
    //        console.log('too many players...');
    //    console.log(num_players);
    //});

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        var msg_send;
        var tmp = new Array();
        tmp = JSON.parse(message);
        name = tmp['player'];
        if(num_players == 0) {
            playerA = new Player();
            playerA.player = tmp['player'];
            playerA.speedX = tmp['speedX'];
            playerA.speedY = tmp['speedY'];
            playerA.shareSpeedX = tmp['shareSpeedX'];
            playerA.shareSpeedY = tmp['shareSpeedY'];
            playerA.ball = tmp['ball'];
            msg_send = "wait";
            num_players ++;
            console.log(num_players);
        }else if(num_players == 1 && name !=playerA.player) {
            playerB = new Player();
            playerB.player = tmp['player'];
            playerB.speedX = tmp['speedX'];
            playerB.speedY = tmp['speedY'];
            playerB.shareSpeedX = tmp['shareSpeedX'];
            playerB.shareSpeedY = tmp['shareSpeedY'];
            playerB.ball = tmp['ball'];
            num_players++;
            console.log(num_players);
            msg_send = '{"'+playerA.player+
                '":{"speedX":"'+playerA.speedX+
                '","speedY":"'+playerA.speedY+
                '","shareSpeedX":"'+playerA.shareSpeedX+
                '","shareSpeedY":"'+playerA.shareSpeedY+
                '","ball":"'+playerA.ball+
                '"},"'+playerB.player+
                '":{"speedX":"'+playerB.speedX+
                '","speedY":"'+playerB.speedY+
                '","shareSpeedX":"'+playerB.shareSpeedX+
                '","shareSpeedY":"'+playerB.shareSpeedY+
                '","ball":"'+playerB.ball+
                '"}}';
        }else{
            if(name == playerA.player){
                console.log("A move...");
                playerA.player = tmp['player'];
                playerA.speedX = tmp['speedX'];
                playerA.speedY = tmp['speedY'];
                playerA.shareSpeedX = tmp['shareSpeedX'];
                playerA.shareSpeedY = tmp['shareSpeedY'];
                playerA.ball = tmp['ball'];
            }else{
                console.log('B move...');
                playerB.player = tmp['player'];
                playerB.speedX = tmp['speedX'];
                playerB.speedY = tmp['speedY'];
                playerB.shareSpeedX = tmp['shareSpeedX'];
                playerB.shareSpeedY = tmp['shareSpeedY'];
                playerB.ball = tmp['ball'];
            }
            msg_send = '{"'+playerA.player+
                    '":{"speedX":"'+playerA.speedX+
                    '","speedY":"'+playerA.speedY+
                    '","shareSpeedX":"'+playerA.shareSpeedX+
                    '","shareSpeedY":"'+playerA.shareSpeedY+
                    '","ball":"'+playerA.ball+
                    '"},"'+playerB.player+
                    '":{"speedX":"'+playerB.speedX+
                    '","speedY":"'+playerB.speedY+
                    '","shareSpeedX":"'+playerB.shareSpeedX+
                    '","shareSpeedY":"'+playerB.shareSpeedY+
                    '","ball":"'+playerB.ball+
                    '"}}';

        }
        console.log(msg_send);
        wss.clients.forEach(function each(client) {
            client.send(msg_send);
        });
    });

    ws.on('close',function close(code,message){
        num_players--;
       console.log(code + message + "player..." + num_players);
    });
});

//wss.on('error',function error(ws){
//    console.log('error...');
//});
//
//wss.on('header',function header(ws){
//    console.log(ws);
//});