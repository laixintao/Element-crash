module pingpang {
	/**
	 *
	 * @author 
	 *
	 */
	export class Bgmap extends egret.DisplayObjectContainer{
    	private bg: egret.Shape;
        private w: number;
        private h: number;
		public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		private onAddToStage():void{
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
            this.createGameScene();
		}
		private createGameScene():void{
            this.w = this.stage.stageWidth;
            this.h = this.stage.stageHeight;
            this.bg = new egret.Shape();
            this.bg.graphics.beginFill(0xccda87);
            this.bg.graphics.drawRect(0,0,this.w,this.h);
            this.bg.graphics.endFill();
            this.addChild(this.bg);//将背景加入
            
		}
	}
}
