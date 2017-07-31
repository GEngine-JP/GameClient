import BasicBinder = Basic.BasicBinder;

class LoadingUICtrl extends BaseUI {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;


    /**
     * 显示
     */
    show() {
        console.log("打开loading界面");
        if (this.loadingView == null)
            this.loadingView = new LoadingUI();
        BasicBinder.bindAll();
        MtwGame.getInstance.stage.addChild(this.loadingView);
    }

    /**
     * 隐藏
     */
    hide() {
        if (this.loadingView) {
            MtwGame.getInstance.stage.removeChild(this.loadingView);
        }
    }


    /**
     * 设置加载进度
     * @param {number} itemsLoaded
     * @param {number} itemsTotal
     */
    public setProgress(itemsLoaded: number, itemsTotal: number): void {
        if (this.loadingView) {
            this.loadingView.setProgress(itemsLoaded, itemsTotal);
        }
    }

}