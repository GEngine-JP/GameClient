class MessageHandler implements IReceiveHandler {
    public constructor() {
    }

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

    public connected(): void {
        GameStateManager.getInstance.changeGameState(GameStateType.Login);
    }
}


interface IReceiveHandler {
    received(cmd: number, bytes: egret.ByteArray): void;

    connected(): void;
}
