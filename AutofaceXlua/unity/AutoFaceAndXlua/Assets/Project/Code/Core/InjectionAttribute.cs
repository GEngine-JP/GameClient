/************************************************************************************* 
**文 件 名：InjectionAttribute 
**创建时间：2017/8/15 星期二 下午 1:50:09 
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


[AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = false)]
public class InjectionAttribute: Attribute
{
    public Type Interfacetype;
    public Type Sourcetype;
    public bool IsSingleton;
    public bool Autoregister = true; //自动注册
    public InjectionAttribute()
    {
        Autoregister = false;
    }

    public InjectionAttribute(Type sourcetype, Type interfacetype, bool isSingleton)
    {
        this.Interfacetype = interfacetype;
        this.Sourcetype = sourcetype;
        this.IsSingleton = isSingleton;
        Autoregister = true;
    }
}
