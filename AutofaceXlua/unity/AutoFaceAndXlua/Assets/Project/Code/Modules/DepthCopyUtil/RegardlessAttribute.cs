/************************************************************************************* 
**文 件 名：RegardlessAttribute 
**创建时间：2017/8/24 星期四 下午 5:17:05 
**作    者：罗弘(email： 243515320@qq.com)
**工    号：102193
**说    明： 
**版    本：V1.0.0  
**修改时间： 
**修 改 人： 
 *************************************************************************************/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;

/// <summary>
/// 标识是否被记录保存的特性
/// </summary>
[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field)]
public class RegardlessAttribute : JsonIgnoreAttribute
{

}
