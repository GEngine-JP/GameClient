/************************************************************************************* 
**文 件 名：Bootstrap 
**创建时间：2017/8/11 星期五 下午 5:27:36 
**作    者：罗弘(email： 243515320@qq.com)
**工    号：102193
**说    明： 
**版    本：V1.0.0  
**修改时间： 
**修 改 人： 
 *************************************************************************************/
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Autofac;
public class Bootstrap:MonoBehaviour
{
    public Button Btn_1;
    public Button Btn_2;
    public Button Btn_3;
    public Text ShowText;
    public AutofaceMgr manager;
    void Awake()
    {
        var builder = new ContainerBuilder();
        builder.RegisterType<AutofaceMgr>();
        builder.RegisterType<AutoFaceBase>().As<IAutoFace>();
        using (var container = builder.Build())
        {
            manager = container.Resolve<AutofaceMgr>();
            manager.Init();
        }
        Btn_1.onClick.AddListener(UnityCallAndroid);
        Btn_2.onClick.AddListener(UnityCallAndroidToastMsg);
        Btn_3.onClick.AddListener(AndroidCallUnity);
    }

    private void UnityCallAndroid()
    {
        int a = AndroidApi.Instance.SDKCall<int>("add", 10, 20);
        ShowText.text = "10+20 呼叫Adroid返回的结果：" + a;
    }

    private void UnityCallAndroidToastMsg()
    {
        AndroidApi.Instance.SDKCall<int>("ShowToast", "安卓需要显示一下哟！！！");
    }

    private void AndroidCallUnity()
    {
        AndroidApi.Instance.SDKCall<int>("CallUnity", "Bootstrap", "ToLuaFunc");
    }

    public void ToLuaFunc()
    {
        manager.OnLuaFunc();
    }
}
