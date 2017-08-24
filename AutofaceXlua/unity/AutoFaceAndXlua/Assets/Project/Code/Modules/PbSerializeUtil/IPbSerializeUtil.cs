/************************************************************************************* 
**文 件 名：IPbSerializeUtil 
**创建时间：2017/8/24 星期四 下午 5:14:44 
**作    者：
**工    号：
**说    明： 
**版    本：V1.0.0  
**修改时间： 
**修 改 人： 
 *************************************************************************************/
using System;
using System.Collections.Generic;

namespace LHPbSerializeUtil
{
  public  interface IPbSerializeUtil
    {
        byte[] PbSerializ<T>(T instance);

        object PbDeserialize<T>(byte[] aBytes);
    }
}
