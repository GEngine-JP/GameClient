/************************************************************************************* 
**文 件 名：SerializeUtil 
**创建时间：2017/8/24 星期四 下午 4:57:26 
**作    者：罗弘(email： 243515320@qq.com)
**工    号：102193
**说    明： 
**版    本：V1.0.0  
**修改时间： 
**修 改 人： 
 *************************************************************************************/
using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using LHDepthCopy;
using UnityEngine;

namespace LHSerializeUtil
{
    [Injection(typeof(SerializeUtil), typeof(ISerializeUtil), true)]
    public class SerializeUtil : ISerializeUtil
    {


        public T Deserialize<T>(byte[] arr) where T : class
        {
            T obj = default(T);
            using (MemoryStream ms = new MemoryStream())
            {
                ms.Write(arr, 0, arr.Length);
                ms.Flush();
                ms.Position = 0;
                BinaryFormatter formatter = new BinaryFormatter();
                obj = formatter.Deserialize(ms) as T;
            }
            //  var Serializestr = JsonUtility.FromJson<T>(arr);
            return obj;
        }

        /// <summary>
        /// 可以序列化1个类
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="obj"></param>
        /// <returns></returns>
        public byte[] Serializ<T>(T obj) where T : class
        {
            byte[] arr = null;
            if (obj != null)
            {
                //MemoryStream类用于向内存而不是磁盘读写数据
                using (MemoryStream ms = new MemoryStream())
                {

                    //序列化操作，把内存中的东西写到硬盘中
                    BinaryFormatter fomatter = new BinaryFormatter();
                    fomatter.Serialize(ms, obj);
                    ms.Flush();
                    arr = ms.ToArray();
                }
            }
            return arr;
        }
    }
}
