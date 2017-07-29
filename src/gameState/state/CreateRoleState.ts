/**
 * 创角状态
 */
class CreateRoleState implements IGameState {
    public constructor() {
    }

    private stateTo: GameStateType;

    /**
     * 获取游戏状态
     * @returns {GameStateType}
     */
    gameState(): GameStateType {
        return GameStateType.CreateRole;
    }

    /**
     * 设置游戏状态
     * @param {GameStateType} gsType
     */
    setStateTo(gsType: GameStateType): void {
        this.stateTo = gsType;
    }

    /**
     * 进入创角状态
     */
    enter(): void {
        console.log("进入创角界面");
        UIManager.getInstance.show(UIType.CreateRole);
    }

    /**
     * 更新
     * @param {number} fDeltaTime
     * @returns {GameStateType}
     * @constructor
     */
    update(fDeltaTime: number): GameStateType {
        return this.stateTo;
    }


    /**
     * 更新
     * @param {GameTime} gameTime
     */
    updateTime(gameTime: GameTime) {

    }

    /**
     * 退出
     */
    exit(): void {
        UIManager.getInstance.hide(UIType.CreateRole);
    }
}