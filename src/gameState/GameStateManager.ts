class GameStateManager {

    public static readonly getInstance: GameStateManager = new GameStateManager();
    private gameStates: { [stateType: number]: IGameState } = {};
    private currentState: IGameState;

    public constructor() {

    }

    public init(): void {
        let gState: IGameState = new LoginState();
        this.gameStates[GameStateType.Login] = gState;

        gState = new LoadingState();
        this.gameStates[GameStateType.Loading] = gState;

        gState = new CreateRoleState();
        this.gameStates[GameStateType.CreateRole] = gState;

        gState = new HomeState();
        this.gameStates[GameStateType.Home] = gState;
    }

    public get curState(): IGameState {
        return this.currentState;
    }

    public changeGameState(state: GameStateType): void {
        if (this.currentState != null && this.currentState.gameState() != GameStateType.Loading && this.currentState.gameState() == state) {
            return;
        }
        if (this.gameStates[state] != null) {
            if (this.currentState != null) {
                this.currentState.exit();
            }
            this.currentState = this.gameStates[state];
            this.currentState.enter();
        }
    }

    public updateTime(gameTime: GameTime) {
        if (this.currentState != null) {
            this.currentState.updateTime(gameTime);
        }
    }

    public Update(fDeltaTime: number): void {
        let nextStateType: GameStateType = GameStateType.Continue;
        if (this.currentState != null) {
            nextStateType = this.currentState.Update(fDeltaTime);
        }

        if (nextStateType > GameStateType.Continue) {
            this.changeGameState(nextStateType);
        }
    }

    public getState(type: GameStateType): IGameState {
        return this.gameStates[type];
    }
}

interface IGameState {
    gameState(): GameStateType;

    setStateTo(gsType: GameStateType): void;

    enter(): void;

    Update(fDeltaTime: number): GameStateType;

    updateTime(gameTime: GameTime);

    exit(): void;
}

const enum GameStateType {
    Continue = 0,
    Loading,
    Login,
    CreateRole,
    Home,
    World
}