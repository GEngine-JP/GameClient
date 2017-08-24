/************************************************************************************* 
**文 件 名：IDepthCopy 
**创建时间：2017/8/24 星期四 下午 5:16:37 
**作    者：
**工    号：
**说    明： 
**版    本：V1.0.0  
**修改时间： 
**修 改 人： 
 *************************************************************************************/
using System;
using System.Collections.Generic;

namespace LHDepthCopy
{
   public interface IDepthCopy
    {
        T DepthCopyObject<T>(T objectdata) where T : class;
    }
}
