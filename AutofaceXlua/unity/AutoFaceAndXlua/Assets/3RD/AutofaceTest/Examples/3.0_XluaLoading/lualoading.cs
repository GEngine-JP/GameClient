using UnityEngine;
using System.Collections;
using XLua;
using System;
using System.IO;

public class lualoading : MonoBehaviour {
    internal static LuaEnv luaEnv = new LuaEnv(); //all lua behaviour shared one luaenv only!
    private LuaTable scriptEnv;                                             // Use this for initialization
    void Start () {
        scriptEnv = luaEnv.NewTable();

        LuaTable meta = luaEnv.NewTable();
        meta.Set("__index", luaEnv.Global);
        scriptEnv.SetMetaTable(meta);
        meta.Dispose();
        luaEnv.AddLoader( (ref string filepath) =>
        {
            filepath = Application.dataPath + "/3RD/AutofaceTest/Examples/3.0_XluaLoading/lua/" + filepath.Replace('.', '/') + ".lua";
            if (File.Exists(filepath))
            {
                return File.ReadAllBytes(filepath);
            }
            else
            {
                return null;
            }
        });

        luaEnv.DoString(@"
            require 'TestLua1'
        ");

        Action Dofunc = scriptEnv.Get<Action>("dofunc1");
        if (Dofunc != null)
        {
            Dofunc();
        }
    }
	

}
