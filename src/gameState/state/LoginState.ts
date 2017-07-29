/**
 * 登录状态
 */
class LoginState implements IGameState {
    public constructor() {
    }

    private stateTo: GameStateType;

    gameState(): GameStateType {
        return GameStateType.Login;
    }

    setStateTo(gsType: GameStateType): void {
        this.stateTo = gsType;
    }

    enter(): void {
        console.log("进入LoginState");
        UIManager.getInstance.show(UIType.Login);
    }

    update(fDeltaTime: number): GameStateType {
        return this.stateTo;
    }

    updateTime(gameTime: GameTime) {

    }

    exit(): void {
        UIManager.getInstance.hide(UIType.Login);
    }
}