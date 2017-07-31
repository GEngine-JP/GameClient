class NetManager {

    public static readonly getInstance: NetManager = new NetManager();

    /**
     * socket连接
     * @type {Connection}
     */
    private connection: Connection = new Connection();

    /**
     * 消息处理器
     * @type {MessageHandler}
     */
    private handler: MessageHandler = new MessageHandler();


    /**
     * 心跳
     */
    public heart() {

    }

    /**
     * 联服务器
     * @param {string} address
     * @param {number} port
     */
    public connect(address: string, port: number) {
        this.connection.setHandler(this.handler);
        this.connection.connect(address, port);
    }


    /**
     * 登录
     * @param {string} loginName
     */
    public login(loginName: string): void {
        let output: egret.ByteArray = new egret.ByteArray();
        // let sid = 1;
        // let pid = 1;
        // let client = 1;
        // let IDNumber: string = "123";
        // let ip: string = "0.0.0.0";
        output.writeUTF(loginName);
        // output.writeInt(sid);
        // output.writeInt(pid);
        // output.writeInt(client);
        // output.writeUTF(IDNumber);
        // output.writeUTF(ip);
        this.connection.sendData(E_MESSAGE_CMD.ReqLoginMessage, output);
    }
}


/**
 * 消息定义
 */
const enum E_MESSAGE_CMD {
    ReqLoginMessage = 1007,
    ResLoginMessage = 1008,
    ResCreateRoleMessage = 1002,
    ReqCreateRoleMessage = 1003,
    ResEnterGameMessage = 1006,
    ReqHeartMessage = 1009,
    ResHeartMessage = 1010,

}