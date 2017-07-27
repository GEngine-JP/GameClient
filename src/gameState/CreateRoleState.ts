class CreateRoleState implements IGameState {
    public constructor() {
    }

    private _stateTo: GameStateType;

    gameState(): GameStateType {
        return GameStateType.CreateRole;
    }

    setStateTo(gsType: GameStateType): void {
        this._stateTo = gsType;
    }

    enter(): void {
        console.log("进入创角界面");
        UIManager.getInstance.show(UIType.CreateRole);
    }

    Update(fDeltaTime: number): GameStateType {
        return this._stateTo;
    }

    updateTime(gameTime: GameTime) {

    }

    exit(): void {
        UIManager.getInstance.hide(UIType.CreateRole);
    }
}