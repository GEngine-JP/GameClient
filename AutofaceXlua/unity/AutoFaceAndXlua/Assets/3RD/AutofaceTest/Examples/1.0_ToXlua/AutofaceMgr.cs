/************************************************************************************* 
**文 件 名：AutofaceMgr 
**创建时间：2017/8/10 星期四 下午 3:31:28 
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
public class AutofaceMgr
{
    IAutoFace _iAutoFace;

    public AutofaceMgr(IAutoFace iAutoFace)
    {
        _iAutoFace = iAutoFace;
    }

    public void Init()
    {
        _iAutoFace.RegisterLua();
        Debug.LogWarning(" sucess register lua!");
    }

    public void OnStart()
    {
        if (_iAutoFace.LuaStart != null)
        {
            _iAutoFace.LuaStart();
        }
    }
    public void OnUpdate()
    {
        if (_iAutoFace.LuaUpdate != null)
        {
            _iAutoFace.LuaUpdate();
        }
    }
    public void OnDestroy()
    {
        if (_iAutoFace.LuaOnDestroy != null)
        {
            _iAutoFace.LuaOnDestroy();
        }
    }
    public void OnLuaFunc()
    {
        if (_iAutoFace.LuaFunc != null)
        {
            _iAutoFace.LuaFunc();
        }
    }

}
