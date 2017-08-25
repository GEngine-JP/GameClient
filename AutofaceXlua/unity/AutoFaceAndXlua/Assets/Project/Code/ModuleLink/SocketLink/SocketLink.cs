/************************************************************************************* 
**文 件 名：SocketLink 
**创建时间：2017/8/25 星期五 下午 5:28:54 
**作    者：罗弘(email： 243515320@qq.com)
**工    号：102193
**说    明： 
**版    本：V1.0.0  
**修改时间： 
**修 改 人： 
 *************************************************************************************/
using System;
using UnityEngine;
using Code.Core;
using DG.Tweening;
using LHNetwork;
using Autofac;
[Injection(typeof(SocketLink), typeof(ISocketLink), true)]
public class SocketLink : ISocketLink
{
    private IClient _Client;
   public IClient Client
    {
        get {
            if (_Client == null)
            {
                _Client =  new SocketClient();
            }

            return _Client;
         }
    }

    public Action ConnetFail
    {
        get {  return Client.ConnetFail; }

        set
        {
            Client.ConnetFail = value;
        }
    }

    public Action ConnetFinish
    {
        get { return Client.ConnetFinish; }

        set
        {
            Client.ConnetFinish = value;
        }
    }

    public ISocketLink ISocketLink
    {
        get { return this; }
    }

    public string IP
    {
        get
        {
          return Client.IP;
        }
    }

    public int Port
    {
        get
        {
            return Client.Port;
        }
    }

    public bool BegainConnect()
    {
        return Client.BegainConnect();
    }

    public bool IsOnline()
    {
        return Client.IsOnline();
    }

    public void RegistSever(string ip, int port)
    {
        Client.RegistSever( ip,  port);
    }

    public bool StopConnect()
    {
       return Client.StopConnect();
    }
}
