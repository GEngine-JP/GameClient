class HomeState implements IGameState {
	public constructor() {
	}
	private _stateTo:GameStateType;
	gameState():GameStateType{
		return GameStateType.Home;
	}

	setStateTo(gsType:GameStateType):void{
		this._stateTo = gsType;
	}

	enter():void{
		console.log("进入Home界面");
		UIManager.Instance.show(UIType.MainUI);
	}

	Update(fDeltaTime:number):GameStateType{
		return this._stateTo;
	}

	updateTime(gameTime:GameTime){
		
	}

	exit():void{
		
	}
}