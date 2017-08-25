/************************************************************************************* 
**文 件 名：GameManager 
**创建时间：2017/8/10 星期四 下午 1:01:02
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

namespace WorthGod
{
    class NetManager:SingletonMono<NetManager>
    {
        public ISocketLink Client
        {
            get { return InjectionEnter.getInstance().Get<ISocketLink>(); }
        }

        void Awake()
        {
            Application.runInBackground = true;
            DontDestroyOnLoad(this);
            Client.RegistSever(AppConst.SocketAddress, AppConst.SocketPort);
            Client.ConnetFinish += OnConnectCallBack;
            Client.ConnetFail += OnCloseConnectCallBack;
        }

        void Start()
        {
            //1.启动连接
            Client.BegainConnect();
            //2.1秒未连接，则启动转圈UI逻辑
            DOVirtual.DelayedCall(1.0f, () =>
            {
                if (!Client.IsOnline())//未连接上网络
                {
                    //todo 出全屏转圈特效
                }
            });
            Debug.LogWarning("尝试连接哟！！");
        }


        /// <summary>
        /// 断开连接时的回调
        /// </summary>
        public void OnCloseConnectCallBack()
        {

        }


        /// <summary>
        /// 连接上的回调
        /// </summary>
        public void OnConnectCallBack()
        {

        }


    }
}
