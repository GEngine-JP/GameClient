/**
 *
 * @author xiaomo
 *
 */
class Connection {

    /**
     * webSocket
     */
    private webSocket: egret.WebSocket;

    /**
     * 消息通讯处理器
     */
    private receivedHandler: IReceiveHandler;

    public constructor() {

    }

    /**
     * 设置消息处理器
     * @param {IReceiveHandler} handler
     */
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

    /**
     * 连接服务器
     * @param {string} host
     * @param {number} port
     */
    public connect(host: string, port: number): void {
        if (this.webSocket) {
            if (this.webSocket.connected) {
                return;
            }
        }
        this.webSocket = new egret.WebSocket();

        //设置数据格式为二进制，默认为字符串
        this.webSocket.type = egret.WebSocket.TYPE_BINARY;

        //添加链接打开侦听，连接成功会调用此方法
        this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);

        //添加收到数据侦听，收到数据会调用此方法
        this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);

        //添加异常侦听，出现异常会调用此方法
        this.webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.ioErrorHandler, this);

        //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
        this.webSocket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);

        //连接服务器
        this.webSocket.connect(host, port);
    }

    private ioErrorHandler(ignored: egret.IOErrorEvent): void {
        console.log("连接服务器失败");
    }

    /**
     * 是否连接成功
     * @returns {boolean}
     */
    public connected(): boolean {
        return this.webSocket ? this.webSocket.connected : false;
    }

    /**跟 服务器连接成功后 执行的子程序*/
    private onSocketOpen(ignored: egret.Event): void {
        console.log("连接至服务器成功");
        setTimeout(() => {
            this.receivedHandler.connected();
        }, 1000);
    }

    /**收到 服务器发来数据 后 执行的子程序*/
    private onReceiveMessage(ignored: egret.Event): void {
        let byteArray: egret.ByteArray = new egret.ByteArray();
        this.webSocket.readBytes(byteArray);
        let size: number = byteArray.readInt() - 4;
        let cmd: number = byteArray.readInt();
        console.log(`收到消息${cmd}`);
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

        this.webSocket.writeBytes(buffer);
        this.webSocket.flush();

    }


    onSocketClose() {
        GameUtil.alert("服务器连接断开。。。");
    }

    /**调度事件 利用自定义事件类DateEvent.ts 在各类之间传递消息内容*/
    private messageEvent(msg: string): void {
        // var daterEvent: DateEvent = new DateEvent(DateEvent.DATE);
        // daterEvent.testTxt = msg;
        // this.webSocket.dispatchEvent(daterEvent);
    }
}

