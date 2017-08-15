/************************************************************************************* 
**文 件 名：SingletonMono 
**创建时间：2017/8/15 星期二 下午 1:43:33 
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

namespace Code.Core
{
    public class SingletonMono<T> : MonoBehaviour where T : MonoBehaviour
    {
        private static T instance;

        /**
      Returns the instance of this singleton.
   */

        public static T GetInstance
        {
            get
            {
                if (instance == null)
                {

                    instance = (T) FindObjectOfType(typeof (T));
                    if (instance == null)
                    {
                        Debug.LogError("An instance of " + typeof (T) +
                                       " is needed in the scene, but there is none.");
                    }
                }
                return instance;
            }
        }
    }
}
