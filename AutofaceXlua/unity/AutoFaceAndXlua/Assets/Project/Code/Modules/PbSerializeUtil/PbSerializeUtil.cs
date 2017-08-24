/************************************************************************************* 
**文 件 名：PbSerializeUtil 
**创建时间：2017/8/24 星期四 下午 5:27:00 
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
using UnityEngine;

namespace LHPbSerializeUtil
{
    [Injection(typeof(PbSerializeUtil), typeof(IPbSerializeUtil), true)]
    public class PbSerializeUtil : IPbSerializeUtil
    {
        public object PbDeserialize<T>(byte[] aBytes)
        {
            try
            {
                using (MemoryStream ms = new MemoryStream())//zj TODO 会导致GC，优化
                {
                    //将消息写入流中
                    ms.Write(aBytes, 0, aBytes.Length);
                    //将流的位置归0
                    ms.Position = 0;
                    //使用工具反序列化对象
                    Type a = typeof (T);
                    object result = ProtoBuf.Serializer.Deserialize<T>(ms);
                    return result;
                }
            }
            catch (Exception ex)
            {
                Debug.Log("反序列化失败: " + ex.ToString());
            }
            return null;
        }

        public byte[] PbSerializ<T>(T instance)
        {
            try
            {
                //涉及格式转换，需要用到流，将二进制序列化到流中
                using (MemoryStream ms = new MemoryStream())//zj TODO 会导致GC，优化
                {
                    //使用ProtoBuf工具的序列化方法
                    ProtoBuf.Serializer.Serialize(ms, instance);
                    //定义二级制数组，保存序列化后的结果
                    byte[] result = new byte[ms.Length];
                    //将流的位置设为0，起始点
                    ms.Position = 0;
                    //将流中的内容读取到二进制数组中
                    ms.Read(result, 0, result.Length);
                    return result;
                }
            }
            catch (Exception ex)
            {
                Debug.Log("序列化失败: " + ex.ToString());
                return null;
            }
        }


    }
}
