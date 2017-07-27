class LoadingUICtrl extends BaseUI {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;


    show() {
        console.log("打开loading界面");
        if (this.loadingView == null)
            this.loadingView = new LoadingUI();
        MtwGame.getInstance.stage.addChild(this.loadingView);
    }

    hide() {
        if (this.loadingView) {
            MtwGame.getInstance.stage.removeChild(this.loadingView);
        }
    }

    public setProgress(itemsLoaded:number,itemsTotal:number):void{

    }

    public setText(value:string):void{
        this.loadingView.setStateWord(value);
    }

}