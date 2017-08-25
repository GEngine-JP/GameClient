/************************************************************************************* 
**文 件 名：GameManager 
**创建时间：2017/8/10 星期四 下午 1:00:13 
**作    者：罗弘(email： 243515320@qq.com)
**工    号：102193
**说    明： 
**版    本：V1.0.0  
**修改时间： 
**修 改 人： 
 *************************************************************************************/
using UnityEngine;
using System.Collections;
using Code.Core;


namespace WorthGod
{
    public class GameManager : SingletonMono<GameManager>
    {
        /// <summary>
        /// 初始化游戏管理器
        /// </summary>
        void Awake()
        {
            Init();
        }

        /// <summary>
        /// 初始化
        /// </summary>
        void Init()
        {
            DontDestroyOnLoad(gameObject);  //防止销毁自己

           // CheckExtractResource(); //释放资源
            Screen.sleepTimeout = SleepTimeout.NeverSleep;
            Application.targetFrameRate = AppConst.GameFrameRate;
        }
    }
}
