class LoadingUI extends egret.Sprite {

    public constructor() {
        super();
        this.createView();
    }

    private textField: egret.TextField;

    private createView(): void {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.size = 50;
        this.textField.textAlign = "center";
        this.textField.x = MtwGame.getInstance.stage.stageWidth / 4;
        this.textField.y = MtwGame.getInstance.stage.stageHeight / 2;

    }

    public setProgress(current: number, total: number): void {
        this.textField.text = `Loading...${current}/${total}`;
    }

}
