/**
 * 下面的示例使用 WebSocketExample 类创建新 WebSocket 对象，然后与服务器通讯。
 */
class Connection extends egret.DisplayObjectContainer {

    public constructor() {
        super();

        this.initStateText();
        this.initWebSocket();
    }

    private stateText: egret.TextField;
    private text: string = "TestWebSocket";

    private initStateText(): void {
        this.stateText = new egret.TextField();
        this.stateText.size = 22;
        this.stateText.text = this.text;
        this.stateText.width = 480;
        this.addChild(this.stateText);
    }

    private socket: egret.WebSocket;

    private initWebSocket(): void {
        //创建 WebSocket 对象
        this.socket = new egret.WebSocket();
        //设置数据格式为二进制，默认为字符串
        this.socket.type = egret.WebSocket.TYPE_BINARY;
        //添加收到数据侦听，收到数据会调用此方法
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        //添加链接打开侦听，连接成功会调用此方法
        this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
        this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        //添加异常侦听，出现异常会调用此方法
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        //连接服务器
        this.socket.connect("localhost", 8001);
    }

    private sendData(): void {
        //创建 ByteArray 对象

        var size: number = 0;
        var content: egret.ByteArray = new egret.ByteArray();
        // content.writeInt(1);
        content.writeUTF("xiaomo");
        // content.writeUTF("b");

        if (content) {
            content.position = 0;
            size = content.length + 10;
        }

        var byte: egret.ByteArray = new egret.ByteArray();
        byte.writeInt(size);
        byte.writeInt(1007);
        byte.writeShort(1);
        byte.writeBytes(content);

        //发送数据
        this.socket.writeBytes(byte, 0, byte.length);
    }

    private onSocketOpen(): void {
        this.trace("WebSocketOpen");
        this.sendData();
    }

    private onSocketClose(): void {
        this.trace("WebSocketClose");
    }

    private onSocketError(): void {
        this.trace("WebSocketError");
    }

    private onReceiveMessage(e: egret.Event): void {
        //创建 ByteArray 对象
        var byte: egret.ByteArray = new egret.ByteArray();
        //读取数据
        this.socket.readBytes(byte);
        //读取字符串信息
        var msg:number = byte.readUnsignedInt();
        console.log(msg);
    }


    private trace(msg: any): void {
        this.text = this.text + "\n" + msg;
        this.stateText.text = this.text;
        egret.log(msg);
    }
}
