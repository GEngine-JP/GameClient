/************************************************************************************* 
**文 件 名：AutoFaceBase 
**创建时间：2017/8/10 星期四 下午 3:13:24 
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
using XLua;
using System.IO;
public class AutoFaceBase : IAutoFace
{
     Action _luaFunc;
    public Action LuaFunc
    {
        get { return _luaFunc; }

        set { _luaFunc = value; }
    }
    Action _luaOnDestroy;
    public Action LuaOnDestroy
    {
        get { return _luaOnDestroy; }

        set { _luaOnDestroy = value; }
    }
     Action _luaStart;
    public Action LuaStart
    {
        get { return _luaStart; }

        set { _luaStart = value; }
    }
     Action _luaUpdate;
    public Action LuaUpdate
    {
        get { return _luaUpdate; }

        set { _luaUpdate = value; }
    }
    private LuaTable scriptEnv;
    internal static LuaEnv luaEnv = new LuaEnv(); //all lua behaviour shared one luaenv only!

    public void RegisterLua()
    {

        luaEnv.DoString("require 'Main'");

        scriptEnv = luaEnv.NewTable();
        LuaTable meta = luaEnv.NewTable();
        meta.Set("__index", luaEnv.Global);
        scriptEnv.SetMetaTable(meta);
        meta.Dispose();
        scriptEnv.Set("self", this);
     

        scriptEnv.Get("start", out _luaStart);
        scriptEnv.Get("update", out _luaUpdate);
        scriptEnv.Get("ondestroy", out _luaOnDestroy);
        scriptEnv.Get("Testfunc", out _luaFunc);
    }

    public string ReadLua(string filePath)
    {
        string str="";
        str = File.ReadAllText(Application.streamingAssetsPath + "/" + filePath);
        return str;
    }
}
