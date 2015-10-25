var pingpang;
(function (pingpang) {
    /**
     *
     * @author
     *
     */
    var Unit = (function () {
        function Unit() {
        }
        var d = __define,c=Unit;p=c.prototype;
        Unit.rectHintTest = function (obj1, obj2) {
            var rect1 = obj1.getBounds();
            var rect2 = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            return rect1.intersects(rect2);
        };
        return Unit;
    })();
    pingpang.Unit = Unit;
    egret.registerClass(Unit,"pingpang.Unit");
})(pingpang || (pingpang = {}));
