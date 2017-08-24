/************************************************************************************* 
**文 件 名：DepthCopy 
**创建时间：2017/8/24 星期四 下午 6:37:23 
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

namespace LHDepthCopy
{
    [Injection(typeof(DepthCopy), typeof(IDepthCopy), true)]
    public class DepthCopy : IDepthCopy
    {
        public T DepthCopyObject<T>(T objectdata) where T : class
        {
            return DataConvertUtility.ConvertToInstance(objectdata) as T;
        }
    }
}
