/**
 * loading状态
 */
class LoadingState implements IGameState {
    public constructor() {
    }

    private currentState: GameStateType;

    /**
     * 获取状态
     * @returns {GameStateType}
     */
    gameState(): GameStateType {
        return GameStateType.Loading;
    }

    /**
     * 设置状态
     * @param {GameStateType} gsType
     */
    setStateTo(gsType: GameStateType): void {
        this.currentState = gsType;
    }


    /**
     * 进入loading状态
     */
    enter(): void {
        console.log("进入LoadingState");
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        UIManager.getInstance.show(UIType.Loading);
    }


    /**
     * 更新
     * @param {number} fDeltaTime
     * @returns {GameStateType}
     * @constructor
     */
    Update(fDeltaTime: number): GameStateType {
        return this.currentState;
    }


    /**
     * 更新时间
     * @param {GameTime} gameTime
     */
    updateTime(gameTime: GameTime) {

    }

    /**
     * 退出loading状态
     * 关闭loading界面
     */
    exit(): void {
        UIManager.getInstance.hide(UIType.Loading);
    }


    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(ignored: RES.ResourceEvent): void {
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

            // 加载配置表
            // ConfigManager.getInstance.initConfigs();
        }

        // 加载fairyUI
        UIManager.addPackages();

        // 连接服务器
        NetManager.getInstance.connect("192.168.1.165", 8001);

        // 设置背景
        // MtwGame.addBg();

        // 设置loading初始进度
        (UIManager.getInstance.getUI(UIType.Loading) as LoadingUICtrl).setProgress(1, 100);
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