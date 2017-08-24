/************************************************************************************* 
**文 件 名：AutofaceBootstrap 
**创建时间：2017/8/22 星期二 下午 2:22:51 
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

namespace AutoFaceTest
{
    public class DependencyResolver
    {
        public static IContainer Container { get; set; }
    }
    public class AutofaceBootstrap : MonoBehaviour
    {
        void Awake()
        {
            var builder = new ContainerBuilder();
            builder.RegisterType<FooTest>().As<IFooTest>();
            builder.RegisterType<Bar>();
            builder.RegisterType<Baz>();
            builder.RegisterType<Baz.Factory>();
            DependencyResolver.Container = builder.Build();
        }
    }

}

