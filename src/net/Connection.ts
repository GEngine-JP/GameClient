/**
 *
 * @author
 *
 */
class Connection {
    /**网络套接字对象*/
    private webSocket: egret.WebSocket;

    /**是否已连接了服务器*/

    private receivedHandler: IReceiveHandler;

    public constructor() {

    }


    public setHandler(handler: IReceiveHandler): void {
        this.receivedHandler = handler;
    }

    /**
     * 连接至服务器
     * sc:地址
     * d:端口
     * */
    public Connection(): void {

    }

    public connect(host: string, port: number): void {
        if (this.webSocket) {
            if (this.webSocket.connected) {
                //console.log("已有连接，勿重复");
                return;
            }
        }
        this.webSocket = new egret.WebSocket();
        this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.webSocket.connect(host, port);
    }

    public connected(): boolean {
        return this.webSocket ? this.webSocket.connected : false;
    }

    /**跟 服务器连接成功后 执行的子程序*/
    private onSocketOpen(e: egret.Event): void {
        console.log("连接至服务器成功");
        this.receivedHandler.connected();
    }

    /**收到 服务器发来数据 后 执行的子程序*/
    private onReceiveMessage(e: egret.Event): void {
        let byteArray: egret.ByteArray = new egret.ByteArray();
        this.webSocket.readBytes(byteArray);
        let size: number = byteArray.readInt() - 4;
        let cmd: number = byteArray.readInt();
        let msgid: number = byteArray.readShort();
        this.receivedHandler.received(cmd, byteArray)
    }

    /**向 服务器 发送数据*/
    public sendData(cmd: any, bytes: egret.ByteArray = null): void {
        if (!this.webSocket.connected) {
            return;
        }

        let size: number = 10;
        if (bytes != null) {
            bytes.position = 0;
            size += bytes.length;
        }

        let buffer: egret.ByteArray = new egret.ByteArray();
        buffer.writeInt(size);
        buffer.writeInt(cmd);
        buffer.writeShort(1);
        if (bytes != null) {
            buffer.writeBytes(bytes);
        }


        this.webSocket.type = egret.WebSocket.TYPE_BINARY;
        this.webSocket.writeBytes(buffer);
        this.webSocket.flush();

    }

    /**调度事件 利用自定义事件类DateEvent.ts 在各类之间传递消息内容*/
    private messageEvent(msg: string): void {
        // var daterEvent:DateEvent = new DateEvent(DateEvent.DATE);
        // daterEvent.testTxt = msg;
        // this.dispatchEvent(daterEvent);
    }
}

