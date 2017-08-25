/************************************************************************************* 
**文 件 名：ISocketLink 
**创建时间：2017/8/25 星期五 下午 5:39:58 
**作    者：
**工    号：
**说    明： 
**版    本：V1.0.0  
**修改时间： 
**修 改 人： 
 *************************************************************************************/
using System;
using System.Collections.Generic;

public interface ISocketLink
{
    ISocketLink ISocketLink { get; }
    /// <summary>
    /// 服务器地址
    /// </summary>
    string IP { get; }
    /// <summary>
    /// 服务器端口号
    /// </summary>
    int Port { get; }

    /// <summary>
    /// 客户端是否连接
    /// </summary>
    bool IsOnline();
    /// <summary>
    /// 尝试连接服务器
    /// </summary>
    bool BegainConnect();
    /// <summary>
    /// 断开连接服务器
    /// </summary>
    bool StopConnect();

    /// <summary>
    /// 注册服务器信息入接口
    /// </summary>
    /// <param name="ip">服务器ip地址</param>
    /// <param name="port">服务器端口</param>
    /// <returns></returns>
    void RegistSever(string ip, int port);

    /// <summary>
    /// 连接失败
    /// </summary>
    Action ConnetFail { get; set; }
    /// <summary>
    /// 连接完成
    /// </summary>
    Action ConnetFinish { get; set; }
}
