var pingpang;
(function (pingpang) {
    /**
     *
     * @author
     *
     */
    var StartBtn = (function (_super) {
        __extends(StartBtn, _super);
        function StartBtn() {
            _super.call(this);
            this.text = new egret.TextField();
            this.text.text = "开始游戏";
            this.width = 160;
            this.height = 80;
            this.text.x = (this.width - this.text.width) / 2;
            this.text.y = (this.height - this.text.height) / 2;
            this.bg = new egret.Shape();
            this.bg.graphics.beginFill(0x000000);
            this.bg.graphics.drawRect(0, 0, 160, 80);
            this.bg.graphics.endFill();
            this.addChild(this.bg);
            this.addChild(this.text);
        }
        var d = __define,c=StartBtn;p=c.prototype;
        return StartBtn;
    })(egret.DisplayObjectContainer);
    pingpang.StartBtn = StartBtn;
    egret.registerClass(StartBtn,"pingpang.StartBtn");
})(pingpang || (pingpang = {}));
