class MtwGame {
    public static readonly getInstance: MtwGame = new MtwGame();

    /**
     * 事件派发器
     */
    public eventCenter: egret.EventDispatcher;

    public constructor() {
    }

    public stage: egret.Stage;
    private heartTime: number = 0;

    public init(stage: egret.Stage): void {
        this.stage = stage;

        // 初始化游戏状态
        GameStateManager.getInstance.init();

        // 初始化UI
        UIManager.getInstance.init();


    }


    /**
     * 更新游戏时间
     * @param {GameTime} gameTime
     */
    public updateTime(gameTime: GameTime): void {
        GameStateManager.getInstance.updateTime(gameTime);
        if (gameTime.totalGameTime > this.heartTime) {
            NetManager.getInstance.heart();
            this.heartTime = gameTime.totalGameTime + 15000;
        }
    }

    /**
     * 添背景
     */
    public static addBg(): void {
        let stage: egret.Stage = MtwGame.getInstance.stage;
        let sky = MtwGame.createBitmapByName("bg_jpg");
        stage.addChildAt(sky, 0);
        let stageW = stage.stageWidth;
        let stageH = stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
    }

    /**
     * 根据名字创建资源
     * @param {string} name
     * @returns {egret.Bitmap}
     */
    private static createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        result.texture = RES.getRes(name);
        return result;
    }
}