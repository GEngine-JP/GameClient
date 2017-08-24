/************************************************************************************* 
**文 件 名：ISerializeUtil 
**创建时间：2017/8/21 星期一 下午 4:32:05 
**作    者：罗弘(email： 243515320@qq.com)
**工    号：
**说    明： 
**版    本：V1.0.0  
**修改时间： 
**修 改 人： 
 *************************************************************************************/
using System;
using System.Collections.Generic;

namespace LHSerializeUtil
{
    public interface ISerializeUtil
    {
        byte[] Serializ<T>(T obj) where T : class;

        T Deserialize<T>(byte[] arr) where T : class;

    }
}

