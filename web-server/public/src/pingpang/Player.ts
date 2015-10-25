module pingpang {
	/**
	 *
	 * @author 
	 *
	 */
	export class Player extends egret.DisplayObjectContainer{
        private body: egret.Shape;
		public constructor() {
            super();
            this.width = 30;
            this.height = 100;
            this.body = new egret.Shape();
            this.body.graphics.beginFill(0x669933);
            this.body.graphics.drawRect(0,0,30,100);
            this.body.graphics.endFill();
            this.addChild(this.body);
		}
	}
}
