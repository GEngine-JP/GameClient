interface IUIBase {
    show(): void;

    hide(): void;

}


class BaseUI implements IUIBase {

    /**
     * ui组件
     */
    private ui: fairygui.GComponent;

    /**
     * 是否被初始化
     * @type {boolean}
     */
    protected hasInit: boolean = false;

    /**
     * 显示
     */
    public show(): void {
        if (!this.hasInit) {
            this.createChildren();
            this.hasInit = true;
        }
        if (this.ui) {
            fairygui.GRoot.inst.addChild(this.ui);
            this.openRefresh();
        }
    }

    /**
     * 隐藏
     */
    hide(): void {
        if (this.ui) {
            if (this.ui.parent) {
                this.ui.parent.removeChild(this.ui);
            }
        }
    }

    /**
     * 创建子组件
     */
    protected createChildren(): void {
    }

    /**
     * 开启刷新
     */
    protected openRefresh(): void {
    }

    /**
     * 关闭完成
     */
    protected closeComplete(): void {

    }

    /**
     * 销毁
     */
    dispose(): void {
        if (this.ui) {
            this.ui.dispose();
            this.ui = null;
        }
    }

}