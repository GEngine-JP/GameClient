/************************************************************************************* 
**文 件 名：IAutoFace 
**创建时间：2017/8/10 星期四 下午 3:04:00 
**作    者：
**工    号：
**说    明： 
**版    本：V1.0.0  
**修改时间： 
**修 改 人： 
 *************************************************************************************/
using System;
using System.Collections.Generic;

public interface IAutoFace
{
    Action LuaStart { get; set; }

    Action LuaUpdate { get; set; }
    Action LuaOnDestroy { get; set; }

    Action LuaFunc { get; set; }
    void RegisterLua();
}
