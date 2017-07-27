class LoadingState implements IGameState {
	public constructor() {
	}
	private _stateTo:GameStateType;
	gameState():GameStateType{
		return GameStateType.Loading;
	}

	setStateTo(gsType:GameStateType):void{
		this._stateTo = gsType;
	}

	enter():void{
		console.log("进入LoadingState");

		 //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
		UIManager.Instance.show(UIType.Loading);
	}

	Update(fDeltaTime:number):GameStateType{
		return this._stateTo;
	}

	updateTime(gameTime:GameTime){

	}

	exit():void{
		UIManager.Instance.hide(UIType.Loading);
	}


	/**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
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
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
			ConfigManager.Instance.initConfigs();
        }
        UIManager.addPackages();
        NetManager.Instance.connect("192.168.1.186",9101);
        MtwGame.addBg();
        (UIManager.Instance.getUI(UIType.Loading) as LoadingUICtrl).setText("正在连接服务器。。。");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
			let loadingui:LoadingUICtrl = <LoadingUICtrl>(UIManager.Instance.getUI(UIType.Loading));
            loadingui.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
}