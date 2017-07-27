class UIManager {
    public static readonly Instance: UIManager = new UIManager();
    private views: { [uitType: number]: IUIBase } = {};

    public constructor() {
    }

    public init(): void {
        this.views[UIType.Loading] = new LoadingUICtrl();

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
        // fairygui.UIPackage.addPackage("Common");
        // fairygui.UIPackage.addPackage("CreateRole");
        // fairygui.UIPackage.addPackage("MainUI");
        fairygui.UIConfig.defaultFont = "宋体";
        stage.addChild(fairygui.GRoot.inst.displayObject);
    }


}


const enum UIType {
    Loading,
    Login,
    MainUI,
    CreateRole,
}