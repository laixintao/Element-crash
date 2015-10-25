var pingpang;
(function (pingpang) {
    /**
     *
     * @author
     *
     */
    var GameContainer = (function (_super) {
        __extends(GameContainer, _super);
        function GameContainer() {
            _super.call(this);
            this.text = "TestWebSocket";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        }
        var d = __define,c=GameContainer;p=c.prototype;
        p.initStateText = function () {
            this.stateText = new egret.TextField();
            this.stateText.size = 22;
            this.stateText.text = this.text;
            this.stateText.width = 480;
            this.addChild(this.stateText);
        };
        p.addToStage = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
            this.createGameScene();
            this.initStateText();
            this.initWebSocket();
        };
        p.initWebSocket = function () {
            //创建 WebSocket 对象
            this.socket = new egret.WebSocket();
            //设置数据格式为二进制，默认为字符串
            //this.socket.type = egret.WebSocket.TYPE_BINARY;
            //添加收到数据侦听，收到数据会调用此方法
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            //添加链接打开侦听，连接成功会调用此方法
            this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
            this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            //添加异常侦听，出现异常会调用此方法
            this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
            //连接服务器
            this.socket.connect("127.0.0.1", 3333);
        };
        p.sendData = function () {
            //创建 ByteArray 对象
            //var byte:egret.ByteArray = new egret.ByteArray();
            //写入字符串信息
            //byte.writeUTF("Hello Egret WebSocket");
            //写入布尔值信息
            //            byte.writeBoolean(false);
            //写入int值信息
            //            byte.writeInt(123);
            //byte.position = 0;
            //发送数据
            this.socket.writeUTF('{"X":"0","Y":"0"}');
        };
        p.onSocketOpen = function () {
            this.trace("WebSocketOpen");
            this.sendData();
        };
        p.onSocketClose = function () {
            this.trace("WebSocketClose");
        };
        p.onSocketError = function () {
            this.trace("WebSocketError");
        };
        p.onReceiveMessage = function (e) {
            //创建 ByteArray 对象
            // var byte:egret.ByteArray = new egret.ByteArray();
            //读取数据
            var msg = this.socket.readUTF();
            //this.player1.x = parseInt(msg);
            var arr = new Array();
            arr = JSON.parse(msg);
            this.speedX = parseInt(arr['X']);
            this.speedY = parseInt(arr['Y']);
            //读取字符串信息
            //var msg:string = byte.readUTF();
            //读取布尔值信息
            //var boo:boolean = byte.readBoolean();
            //读取int值信息
            //var num:number = byte.readInt();
            //this.trace("收到数据:");
            //this.trace("readUTF : "+msg);
            // this.trace("readBoolean : "+boo.toString());
            //this.trace("readInt : "+num.toString());
        };
        p.trace = function (msg) {
            this.text = this.text + "\n" + msg;
            this.stateText.text = this.text;
            console.log(msg);
        };
        p.createGameScene = function () {
            var _this = this;
            this.bg = new pingpang.Bgmap();
            this.addChild(this.bg);
            this.startBtn = new pingpang.StartBtn();
            this.startBtn.x = (this.stage.stageWidth - this.startBtn.width) / 2;
            this.startBtn.y = (this.stage.stageHeight - this.startBtn.height) / 2;
            this.startBtn.touchEnabled = true;
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
            this.addChild(this.startBtn);
            this.player1 = new pingpang.Player();
            this.player1.x = 140;
            this.player1.y = (this.stage.stageHeight - this.player1.height) / 2;
            this.addChild(this.player1);
            this.info = new egret.TextField();
            this.addChild(this.info);
            document.addEventListener("keydown", function (e) { return _this.onKeyDown(e); }, false);
            document.addEventListener("keyup", function (e) { return _this.onKeyUp(e); }, false);
            this.addEventListener(egret.Event.ENTER_FRAME, this.move, this);
            this.speedX = 0;
            this.speedY = 0;
        };
        p.move = function () {
            this.player1.x += this.speedX;
            this.player1.y += this.speedY;
            if (this.player1.x <= 0) {
                this.player1.x = 0;
            }
            else if (this.player1.x >= this.stage.stageWidth / 2 - this.player1.width - 200) {
                this.player1.x = this.stage.stageWidth / 2 - this.player1.width - 200;
            }
            if (this.player1.y <= 0) {
                this.player1.y = 0;
            }
            else if (this.player1.y >= this.stage.stageHeight - this.player1.height) {
                this.player1.y = this.stage.stageHeight - this.player1.height;
            }
        };
        p.onKeyDown = function (e) {
            if (e.keyCode == KeyBoard.LEFT) {
                this.shareX = -5;
            }
            else if (e.keyCode == KeyBoard.RIGHT) {
                this.shareX = 5;
            }
            else if (e.keyCode == KeyBoard.UP) {
                this.shareY = -9;
            }
            else if (e.keyCode == KeyBoard.DOWN) {
                this.shareY = 9;
            }
            //this.socket.writeUTF(this.player1.x.toString());
            this.socket.writeUTF('{"X":"' + this.shareX + '","Y":"' + this.shareY + '"}');
        };
        p.onKeyUp = function (e) {
            if (e.keyCode == KeyBoard.LEFT || e.keyCode == KeyBoard.RIGHT) {
                this.shareX = 0;
            }
            else if (e.keyCode == KeyBoard.UP || e.keyCode == KeyBoard.DOWN) {
                this.shareY = 0;
            }
            this.socket.writeUTF('{"X":"' + this.shareX + '","Y":"' + this.shareY + '"}');
        };
        p.startGame = function () {
            this.removeChild(this.startBtn);
        };
        return GameContainer;
    })(egret.DisplayObjectContainer);
    pingpang.GameContainer = GameContainer;
    egret.registerClass(GameContainer,"pingpang.GameContainer");
})(pingpang || (pingpang = {}));
