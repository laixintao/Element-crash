var pingpang;
(function (pingpang) {
    /**
     *
     * @author
     *
     */
    var Bgmap = (function (_super) {
        __extends(Bgmap, _super);
        function Bgmap() {
            _super.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=Bgmap;p=c.prototype;
        p.onAddToStage = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.createGameScene();
        };
        p.createGameScene = function () {
            this.w = this.stage.stageWidth;
            this.h = this.stage.stageHeight;
            this.bg = new egret.Shape();
            this.bg.graphics.beginFill(0xccda87);
            this.bg.graphics.drawRect(0, 0, this.w, this.h);
            this.bg.graphics.endFill();
            this.addChild(this.bg); //将背景加入
        };
        return Bgmap;
    })(egret.DisplayObjectContainer);
    pingpang.Bgmap = Bgmap;
    egret.registerClass(Bgmap,"pingpang.Bgmap");
})(pingpang || (pingpang = {}));
