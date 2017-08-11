/************************************************************************************* 
**文 件 名：AutofaceTest 
**创建时间：2017/8/10 星期四 下午 3:01:06 
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
using Autofac;
using  UnityEngine.UI;
public class AutofaceTest:MonoBehaviour
{
    public AutofaceMgr manager;
    public Button button;
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
        button.onClick.AddListener(ToLuaFunc);
    }

    void Start()
    {
        manager.OnStart();
    }
    void Update()
    {
      //  manager.OnUpdate();
    }
    void OnDestroy()
    {
        manager.OnDestroy();
    }

    private void ToLuaFunc()
    {
        manager.OnLuaFunc();
    }
}
