class GameStateManager {

	public static readonly Instance: GameStateManager = new GameStateManager();
	private _gameStates:{[stateType:number]:IGameState} = {};
	private _currentState:IGameState;
	public constructor() {

	}
	
	public init():void{
		let gState:IGameState = new LoginState();
		this._gameStates[GameStateType.Login] = gState;

		gState = new LoadingState();
		this._gameStates[GameStateType.Loading] = gState;

		gState = new CreateRoleState();
		this._gameStates[GameStateType.CreateRole] = gState;

		gState = new HomeState();
		this._gameStates[GameStateType.Home] = gState;
	}

	public get curState():IGameState{
		return this._currentState;
	}

	public changeGameState(state:GameStateType):void{
		if(this._currentState != null && this._currentState.gameState() != GameStateType.Loading && this._currentState.gameState() == state)
		{
			return;
		}
		if(this._gameStates[state] != null){
			if(this._currentState != null){
				this._currentState.exit();
			}
			this._currentState = this._gameStates[state];
			this._currentState.enter();
		}
	}

	public  updateTime(gameTime:GameTime)
	{
		if (this._currentState != null)
		{
			this._currentState.updateTime(gameTime);
		}
	}

	public Update(fDeltaTime:number):void
	{
		let nextStateType:GameStateType = GameStateType.Continue;
		if (this._currentState != null)
		{
			nextStateType = this._currentState.Update(fDeltaTime);
		}

		if (nextStateType > GameStateType.Continue)
		{
			this.changeGameState(nextStateType);
		}
	}

	public getState(type:GameStateType):IGameState
	{
		return this._gameStates[type];
	}
}

interface IGameState{
	gameState():GameStateType;
	setStateTo(gsType:GameStateType):void;
	enter():void;
	Update(fDeltaTime:number):GameStateType;
	updateTime(gameTime:GameTime);
	exit():void;
}

const enum GameStateType{
	Continue = 0,
	Loading,
	Login,
	CreateRole,
	Home,
	World
}