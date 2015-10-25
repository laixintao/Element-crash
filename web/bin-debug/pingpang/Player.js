var pingpang;
(function (pingpang) {
    /**
     *
     * @author
     *
     */
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
            _super.call(this);
            this.width = 30;
            this.height = 100;
            this.body = new egret.Shape();
            this.body.graphics.beginFill(0x669933);
            this.body.graphics.drawRect(0, 0, 30, 100);
            this.body.graphics.endFill();
            this.addChild(this.body);
        }
        var d = __define,c=Player;p=c.prototype;
        return Player;
    })(egret.DisplayObjectContainer);
    pingpang.Player = Player;
    egret.registerClass(Player,"pingpang.Player");
})(pingpang || (pingpang = {}));
