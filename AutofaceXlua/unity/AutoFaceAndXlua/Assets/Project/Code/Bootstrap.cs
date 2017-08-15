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
using Code.AdroidApi;

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
        int a = UnityEngine.Random.Range(1, 100);
        int b = UnityEngine.Random.Range(1, 100);
        int c = AndroidApi.getInstance().SDKCall<int>("add", a, b);
        ShowText.text = a+"+"+b+" 呼叫Adroid返回的结果：" + c;
    }

    private void UnityCallAndroidToastMsg()
    {
        AndroidApi.getInstance().SDKCall("ShowToast", "安卓需要显示一下哟！！！");
    }

    private void AndroidCallUnity()
    {
        /// android 方法， 挂有呼叫方法的对象名字，方法名字
        AndroidApi.getInstance().SDKCall("CallUnity", "Canvas", "ToLuaFunc");
    }

    private int callnum = 0;
    public void ToLuaFunc()
    {
        manager.OnLuaFunc();
        callnum++;
        ShowText.text = "android通知unity方法, 呼叫 "+ callnum +"次";
    }
}
