class Main extends egret.DisplayObjectContainer {

    private gameTime: GameTime;


    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }


    /**
     * 添加进场景的时候
     * @param {egret.Event} event
     */
    private onAddToStage(event: egret.Event) {
        // 初始化游戏
        MtwGame.getInstance.init(this.stage);
        this.gameTime = new GameTime();
        this.gameTime.totalGameTime = egret.getTimer();
        //this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
        egret.startTick(this.timeTick, this);

    }

    /**
     * 计时器
     * @param {number} timeStamp
     * @returns {boolean}
     */
    private timeTick(timeStamp: number): boolean {
        const now = timeStamp;
        const time = this.gameTime.totalGameTime;
        this.gameTime.elapsedGameTime = now - time;
        this.gameTime.totalGameTime = now;
        MtwGame.getInstance.updateTime(this.gameTime);
        return false;
    }
}


