class MessageHandler implements IReceiveHandler {
    public constructor() {
    }

    /**
     * 接受消息
     * @param {number} cmd
     * @param {egret.ByteArray} bytes
     */
    public received(cmd: number, bytes: egret.ByteArray): void {
        switch (cmd) {
            case E_MESSAGE_CMD.ResEnterGameMessage: {
                let uid: Long = Long.readLong(bytes);//玩家id
                let mapId: number = bytes.readInt();//地图ID
                let line = bytes.readInt();//分线
                let x = bytes.readInt();//y
                let y = bytes.readInt();//x
                let serverTime = Long.readLong(bytes);//服务器时间
                console.log("进入游戏");
                GameStateManager.getInstance.changeGameState(GameStateType.Home);
            }
                break;
            case E_MESSAGE_CMD.ResLoginMessage: {
                let uid: Long = Long.readLong(bytes);//玩家id
                console.log(uid.toNumber());
                // let mapId: number = bytes.readInt();//地图ID
                // let line = bytes.readInt();//分线
                // let x = bytes.readInt();//y
                // let y = bytes.readInt();//x
                // let serverTime = Long.readLong(bytes);//服务器时间
                console.log("进入游戏");
                GameStateManager.getInstance.changeGameState(GameStateType.Home);
            }
                break;
            case E_MESSAGE_CMD.ResCreateRoleMessage: {
                let uid: Long = Long.readLong(bytes);
                PlayerData.getInstance.randomName = bytes.readUTF();
                PlayerData.getInstance.uid = uid;
                GameStateManager.getInstance.changeGameState(GameStateType.CreateRole);
            }
                break;
            case E_MESSAGE_CMD.ResHeartMessage: {
                let serverTime: number = Long.readLong(bytes).toNumber();
                let date: Date = new Date(serverTime);
                console.log("当前服务器时间" + date.toUTCString());

            }
                break;
        }
    }

    /**
     * 和服务端连接上之后跳到登录界面
     */
    public connected(): void {
        GameStateManager.getInstance.changeGameState(GameStateType.Login);
    }
}


interface IReceiveHandler {

    /**
     * 接收消息
     * @param {number} cmd
     * @param {egret.ByteArray} bytes
     */
    received(cmd: number, bytes: egret.ByteArray): void;


    /**
     * 连接之后操作
     */
    connected(): void;
}
