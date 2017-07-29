class UIManager {
    public static readonly getInstance: UIManager = new UIManager();
    private views: { [uitType: number]: IUIBase } = {};

    public constructor() {
    }


    /**
     * 初始化UI控制器
     */
    public init(): void {
        // 添加loadingUI控制器
        this.views[UIType.Loading] = new LoadingUICtrl();
        // 添加登录UI控制器
        this.views[UIType.Login] = new LoginUICtrl()
    }


    /**
     * 显示ui
     * @param {UIType} uiType
     */
    public show(uiType: UIType) {
        let view = this.views[uiType];
        if (view) {
            view.show();
        }
    }

    /**
     * 隐藏UI
     * @param {UIType} uiType
     */
    public hide(uiType: UIType) {
        let view = this.views[uiType];
        if (view) {
            view.hide();
        }
    }


    /**
     * 加载fairyUI
     */
    public static addPackages() {
        let stage: egret.Stage = MtwGame.getInstance.stage;
        fairygui.UIPackage.addPackage("Login");
        // fairygui.UIPackage.addPackage("Basic");
        fairygui.UIConfig.defaultFont = "宋体";
        stage.addChild(fairygui.GRoot.inst.displayObject);
    }


    /**
     * 获得ui
     * @param {UIType} type
     * @returns {IUIBase}
     */
    public getUI(type: UIType): IUIBase {
        return this.views[type];
    }


}

/**
 * 有多少个界面就有多少个类型
 */
const enum UIType {
    Loading,
    Login,
    MainUI,
    CreateRole,
}