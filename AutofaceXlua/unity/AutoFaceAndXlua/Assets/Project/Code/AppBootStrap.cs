/************************************************************************************* 
**文 件 名：AppBootStrap 
**创建时间：2017/8/15 星期二 下午 3:14:01 
**作    者：罗弘(email： 243515320@qq.com)
**工    号：102193
**说    明：程序的主入口
**版    本：V1.0.0  
**修改时间： 
**修 改 人： 
 *************************************************************************************/
using System;
using UnityEngine;
using Code.Core;
using WorthGod;
using LHPbSerializeUtil;

public class AppBootStrap : MonoBehaviour
{
    void Awake()
    {
        DontDestroyOnLoad(this);
        //1,启动游戏，注入依赖
        InjectionEnter.getInstance().Injection();
        Screen.sleepTimeout = SleepTimeout.NeverSleep;
        Application.targetFrameRate = AppConst.GameFrameRate;
        GameStart();
    }

    //资源更新
    private void DownLoadResource()
    {
        
    }

    /// <summary>
    /// 游戏启动
    /// </summary>
    private void GameStart()
    {
        //todo 2.启动网络模块
        NetManager.getInstance();

        //todo 3.启动更新流程，加载lua体系
        GameManager.getInstance();
    }
}

