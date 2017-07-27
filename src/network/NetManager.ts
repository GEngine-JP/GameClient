class NetManager {

    public static readonly getInstance: NetManager = new NetManager();
    private connection: Connection = new Connection();
    private handler:MessageHandler = new MessageHandler();
    public heart() {

    }

    public connect(address: string, port: number) {
        this.connection.setHandler(this.handler);
        this.connection.connect(address, port);
    }

    public login(loginname: string): void {
        let output: egret.ByteArray = new egret.ByteArray();
        let loginName: string = loginname;
        let sid = 1;
        let pid = 1;
        let client = 1;
        let IDNumber: string = "123";
        let ip: string = "0.0.0.0";
        output.writeUTF(loginName);
        output.writeInt(sid);
        output.writeInt(pid);
        output.writeInt(client);
        output.writeUTF(IDNumber);
        output.writeUTF(ip);
        this.connection.sendData(E_MESSAGE_CMD.ReqLoginMessage, output);
    }
}

const enum E_MESSAGE_CMD {
    ReqLoginMessage = 1001,
    ResCreateRoleMessage = 1002,
    ReqCreateRoleMessage = 1003,
    ResEnterGameMessage = 1006,
    ReqHeartMessage = 1009,
    ResHeartMessage = 1010,

}