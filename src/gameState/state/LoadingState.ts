/**
 * loading状态
 */
class LoadingState implements IGameState {
    public constructor() {
    }

    private stateTo: GameStateType;

    gameState(): GameStateType {
        return GameStateType.Loading;
    }

    setStateTo(gsType: GameStateType): void {
        this.stateTo = gsType;
    }

    enter(): void {
        console.log("进入LoadingState");

        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        UIManager.getInstance.show(UIType.Loading);
    }

    Update(fDeltaTime: number): GameStateType {
        return this.stateTo;
    }

    updateTime(gameTime: GameTime) {

    }

    exit(): void {
        UIManager.getInstance.hide(UIType.Loading);
    }


    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, LoadingState.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, LoadingState.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {

            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, LoadingState.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, LoadingState.onItemLoadError, this);
            // ConfigManager.getInstance.initConfigs();
        }
        UIManager.addPackages();
        NetManager.getInstance.connect("192.168.1.165", 8001);
        // MtwGame.addBg();
        (UIManager.getInstance.getUI(UIType.Loading) as LoadingUICtrl).setText("正在连接服务器。。。");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private static onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private static onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            let loadingUI: LoadingUICtrl = <LoadingUICtrl>(UIManager.getInstance.getUI(UIType.Loading));
            loadingUI.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
}