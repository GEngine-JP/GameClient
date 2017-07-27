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
                GameStateManager.Instance.changeGameState(GameStateType.Home);
            }
                break;
            case E_MESSAGE_CMD.ResCreateRoleMessage: {
                let uid: Long = Long.readLong(bytes);
                let randomName: string = bytes.readUTF();
                PlayerData.Instance.randomName = randomName;
                PlayerData.Instance.uid = uid;
                GameStateManager.Instance.changeGameState(GameStateType.CreateRole);
            }
                break;
            case E_MESSAGE_CMD.ResHeartMessage: {
                let servertime: number = Long.readLong(bytes).toNumber();
                let date: Date = new Date(servertime);
                console.log("当前服务器时间" + date.toUTCString());

            }
                break;
        }
    }

    public connected(): void {
        GameStateManager.Instance.changeGameState(GameStateType.Login);
    }
}


interface IReceiveHandler {
    received(cmd: number, bytes: egret.ByteArray): void;

    connected(): void;
}
