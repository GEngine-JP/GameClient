class UIManager {
    public static readonly getInstance: UIManager = new UIManager();
    private views: { [uitType: number]: IUIBase } = {};

    public constructor() {
    }

    public init(): void {
        this.views[UIType.Loading] = new LoadingUICtrl();
        this.views[UIType.Login] = new LoginUICtrl()

    }

    public show(uiType: UIType) {
        let view = this.views[uiType];
        if (view) {
            view.show();
        }
    }

    public hide(uiType: UIType) {
        let view = this.views[uiType];
        if (view) {
            view.hide();
        }
    }


    public static addPackages() {
        let stage: egret.Stage = MtwGame.Instance.stage;
        fairygui.UIPackage.addPackage("Login");
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


const enum UIType {
    Loading,
    Login,
    MainUI,
    CreateRole,
}