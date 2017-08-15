/************************************************************************************* 
**文 件 名：AndroidApi 
**创建时间：2017/8/11 星期五 下午 3:10:15 
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
using  Code.Core;

namespace Code.AdroidApi
{
    public class AndroidApi : Singleton<AndroidApi>
    {
        private AndroidJavaObject _javaObj;

        public AndroidJavaObject JavaObj
        {

            get
            {
                if (_javaObj == null)
                {
                    using (AndroidJavaClass jc = new AndroidJavaClass("com.unity3d.player.UnityPlayer"))
                    {
                        _javaObj = jc.GetStatic<AndroidJavaObject>("currentActivity");
                    }
                }
                return _javaObj;
            }
        }

        public T SDKCall<T>(string method, params object[] param)
        {
            try
            {
                return JavaObj.Call<T>(method, param);
            }
            catch (Exception e)
            {
                Debug.LogError(e);
            }
            return default(T);
        }

        public void SDKCall(string method, params object[] param)
        {
            try
            {
                JavaObj.Call(method, param);
            }
            catch (Exception e)
            {
                Debug.LogError(e);
            }
        }

    }
}
