/************************************************************************************* 
**文 件 名：InjectionEnter 
**创建时间：2017/8/16 星期三 下午 12:00:53 
**作    者：罗弘(email： 243515320@qq.com)
**工    号：102193
**说    明：依赖注入的管理器 
**版    本：V1.0.0  
**修改时间： 
**修 改 人： 
 *************************************************************************************/
using System;
using System.Reflection;
using UnityEngine;
using Autofac;

namespace Code.Core
{
    public class InjectionEnter : Singleton<InjectionEnter>
    {
        public ContainerBuilder Builder;
        IContainer _container;
        public void Injection()
        {
            ContainerBuilder builder = new ContainerBuilder();
            foreach (Assembly b in AppDomain.CurrentDomain.GetAssemblies())
            {
                InjectAssembly(b, builder);
            }
            _container = builder.Build();
        }
        private void InjectAssembly(Assembly getExecutingAssembly, ContainerBuilder builder)
        {
            Type[] ts = getExecutingAssembly.GetTypes();
            foreach (var types in ts)
            {
                var temarrtibute = types.GetCustomAttributes(typeof(InjectionAttribute), false);
                foreach (var customAttributes in temarrtibute)
                {
                    var temaaa = (InjectionAttribute)customAttributes;
                    if (temaaa != null)
                    {
                        if (temaaa.Autoregister) //自动注册
                        {
                            if (temaaa.IsSingleton)
                            {
                                var tem = Activator.CreateInstance(temaaa.Sourcetype);
                                builder.RegisterInstance(tem).As(temaaa.Interfacetype).PropertiesAutowired().SingleInstance();
                            }
                            else
                            {
                                builder.RegisterType(temaaa.Sourcetype).As(temaaa.Interfacetype).PropertiesAutowired();
                            }
                        }
                        else //手动注册
                        {
                            var tem = Activator.CreateInstance(types) as BaseComponentMode;
                            if (tem != null)
                            {
                                builder.RegisterModule(tem);
                            }
                        }
                    }
                }
            }
        }

        public T Get<T>()
        {
            return _container.Resolve<T>();
        }
    }
}
