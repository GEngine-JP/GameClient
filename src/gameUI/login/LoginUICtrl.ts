class LoginUICtrl extends BaseUI {

    private view: Login.UILoginMain;

    protected createChildren(): void {
        console.log("打开登录界面");
        Login.LoginBinder.bindAll();
        this.ui = this.view = Login.UILoginMain.createInstance();
        this.view.x = MtwGame.getInstance.stage.stageWidth / 2 - this.view.width / 2;
        this.view.y = MtwGame.getInstance.stage.stageHeight - this.view.height - 50;

    }

    protected openRefresh(): void {
        this.view.loginButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submitHandler, this);
        this.view.loginName.addEventListener(egret.FocusEvent.FOCUS_IN, this.inputFocusInHandler, this);
        this.view.loginName.addEventListener(egret.FocusEvent.FOCUS_OUT, this.inputFocusOutHandler, this);
        this.view.loginName.requestFocus();
    }

    private inputFocusInHandler(e: egret.FocusEvent): void {
        if (this.view.loginName.text == "请输入账号") {
            this.view.loginName.text = "";
        }
    }

    private inputFocusOutHandler(e: egret.FocusEvent): void {
        if (this.view.loginName.text == "") {
            this.view.loginName.text = "请输入账号";
        }
    }

    private submitHandler(e: egret.TouchEvent): void {
        console.log("登录游戏");
        NetManager.getInstance.login(this.view.loginName.text);
    }

    protected closeComplete(): void {
        super.closeComplete();
        if (this.view) {
            this.view.loginButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.submitHandler, this);
            this.view.loginName.removeEventListener(egret.FocusEvent.FOCUS_IN, this.inputFocusInHandler, this);
            this.view.loginName.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.inputFocusOutHandler, this);
        }
        this.dispose();
    }

    public dispose(): void {
        if (this.view) {
            this.view.loginButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.submitHandler, this);
            this.view = null;
        }
        super.dispose();
        fairygui.UIPackage.removePackage("Login");
    }

}