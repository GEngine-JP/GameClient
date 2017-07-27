class GameStateManager {

    public static readonly getInstance: GameStateManager = new GameStateManager();

    /**
     * 游戏状态集合
     * @type {{}}
     */
    private gameStates: { [stateType: number]: IGameState } = {};

    /**
     * 当前游戏状态
     */
    private currentState: IGameState;

    public constructor() {

    }

    /**
     * 初始化游戏状态
     */
    public init(): void {
        let gameState: IGameState = new LoginState();
        this.gameStates[GameStateType.Login] = gameState;

        gameState = new LoadingState();
        this.gameStates[GameStateType.Loading] = gameState;

        gameState = new CreateRoleState();
        this.gameStates[GameStateType.CreateRole] = gameState;

        gameState = new HomeState();
        this.gameStates[GameStateType.Home] = gameState;
    }


    /**
     * 获取当前状态
     * @returns {IGameState}
     */
    public get curState(): IGameState {
        return this.currentState;
    }


    /**
     * 改变游戏状态
     * @param {GameStateType} state
     */
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


    /**
     * 更新时间
     * @param {GameTime} gameTime
     */
    public updateTime(gameTime: GameTime) {
        if (this.currentState != null) {
            this.currentState.updateTime(gameTime);
        }
    }

    /**
     * 更新
     * @param {number} fDeltaTime
     * @constructor
     */
    public update(fDeltaTime: number): void {
        let nextStateType: GameStateType = GameStateType.Continue;
        if (this.currentState != null) {
            nextStateType = this.currentState.Update(fDeltaTime);
        }

        if (nextStateType > GameStateType.Continue) {
            this.changeGameState(nextStateType);
        }
    }


    /**
     * 获取游戏状态
     * @param {GameStateType} type
     * @returns {IGameState}
     */
    public getState(type: GameStateType): IGameState {
        return this.gameStates[type];
    }
}

interface IGameState {

    /**
     * 当前游戏状态
     * @returns {GameStateType}
     */
    gameState(): GameStateType;

    /**
     * 设置游戏状态
     * @param {GameStateType} gsType
     */
    setStateTo(gsType: GameStateType): void;

    /**
     * 进入游戏状态
     */
    enter(): void;

    /**
     * 更新
     * @param {number} fDeltaTime
     * @returns {GameStateType}
     * @constructor
     */
    Update(fDeltaTime: number): GameStateType;

    /**
     * 更新
     * @param {GameTime} gameTime
     */
    updateTime(gameTime: GameTime);

    /**
     * 退出
     */
    exit(): void;
}


/**
 * 状态类型
 */
const enum GameStateType {
    Continue = 0,
    Loading,
    Login,
    CreateRole,
    Home,
    World
}