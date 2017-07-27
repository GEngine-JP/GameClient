class LoginState implements IGameState {
	public constructor() {
	}
	private _stateTo:GameStateType;
	gameState():GameStateType{
		return GameStateType.Login;
	}

	setStateTo(gsType:GameStateType):void{
		this._stateTo = gsType;
	}

	enter():void{
		console.log("进入LoginState");
		UIManager.Instance.show(UIType.Login);
	}

	Update(fDeltaTime:number):GameStateType{
		return this._stateTo;
	}

	updateTime(gameTime:GameTime){

	}

	exit():void{
		UIManager.Instance.hide(UIType.Login);
	}
}