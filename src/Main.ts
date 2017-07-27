class Main extends egret.DisplayObjectContainer {

    private gameTime: GameTime;


    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        MtwGame.getInstance.init(this.stage);
        this.gameTime = new GameTime();
        this.gameTime.totalGameTime = egret.getTimer();
        //this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
        egret.startTick(this.timeTick, this);

    }


    private timeTick(timeStamp: number): boolean {
        const now = timeStamp;
        const time = this.gameTime.totalGameTime;
        this.gameTime.elapsedGameTime = now - time;
        this.gameTime.totalGameTime = now;
        MtwGame.getInstance.updateTime(this.gameTime);
        return false;
    }
}


