/************************************************************************************* 
**文 件 名：SocketClient 
**创建时间：2017/8/16 星期三 上午 11:55:04 
**作    者：罗弘(email： 243515320@qq.com)
**工    号：102193
**说    明：实现模块的功能 
**版    本：V1.0.0  
**修改时间： 
**修 改 人： 
 *************************************************************************************/
using System;
using System.Collections.Generic;
using UnityEngine;
using System.Net.Sockets;
using System.Net;

namespace LHNetwork
{
    [Injection(typeof(SocketClient), typeof(IClient), true)]
    public class SocketClient : IClient
    {
        private Socket tcpClient;
        public IClient IClient
        {
            get { return this; }
        }
        /// <summary>
        /// 服务器Ip地址
        /// </summary>
        private string _ip;
        public string IP
        {
            get { return _ip; }
        }

        /// <summary>
        /// 服务器端口号
        /// </summary>
        private int _port;
        public int Port
        {
            get { return _port; }
        }

        public bool IsOnline()
        {
            if (tcpClient == null) return false;
            else
            return !((tcpClient.Poll(1000, SelectMode.SelectRead) && (tcpClient.Available == 0)) || !tcpClient.Connected);
        }

        public bool BegainConnect()
        {
            try
            {
                AsynConnect(IP, Port);
                return true;
            }
            catch (Exception)
            {
                Debug.Log("客户端打开失败");
                return false;
            }
        }

        /// <summary>
        ///     异步连接
        /// </summary>
        /// <param name="ip">ip</param>
        /// <param name="port">端口</param>
        public void AsynConnect(string ip, int port)
        {
            var serverIp = new IPEndPoint(IPAddress.Parse(ip), port);
            tcpClient = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
            tcpClient.BeginConnect(serverIp, ConnectComplete, null);
        }
        /// <summary>
        /// 连接完成
        /// </summary>
        /// <param name="asyncResult"></param>
        private void ConnectComplete(IAsyncResult asyncResult)
        {
            tcpClient.EndConnect(asyncResult);
            if (ConnetFinish != null)
            {
                ConnetFinish();
            }
        }

        public void RegistSever(string ip, int port)
        {
            this._ip = ip;
            this._port = port;
        }

        public Action ConnetFail { get; set; }
        public Action ConnetFinish { get; set; }

        /// <summary>
        /// 主动结束连接
        /// </summary>
        /// <returns></returns>
        public bool StopConnect()
        {
            try
            {
                Close();
                return true;
            }
            catch (Exception)
            {
                UnityEngine.Debug.Log("客户端关闭失败");
                return false;
            }
        }

        public void Close()
        {
            if (tcpClient != null)
            {
                var lo = new LingerOption(true, 5);
                tcpClient.LingerState = lo;
                tcpClient.Shutdown(SocketShutdown.Both);
                tcpClient.Close();
            }
            GC.Collect();
        }
    }
}
