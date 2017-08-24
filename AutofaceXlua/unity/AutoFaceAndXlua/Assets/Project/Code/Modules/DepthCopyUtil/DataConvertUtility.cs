using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.Remoting;
using System.Text;
using Newtonsoft.Json;
using UnityEngine;

namespace LHDepthCopy
{
    public class DataConvertUtility
    {
        #region 输出相关

        /// <summary>
        /// 将实例转换到文件存储
        /// </summary>
        /// <param name="instance">数据实例</param>
        /// <param name="filePath">数据文件路径</param>
        /// <returns></returns>
        public static bool ConvertInstanceToFile(object instance, string filePath)
        {
            bool result = false;
            try
            {
                string strContent = ConvertInstanceToJsonString(instance);
                File.WriteAllText(filePath, strContent);
                result = true;
            }
            catch (Exception e)
            {
                UnityEngine.Debug.LogError(e);
            }
            return result;
        }

        /// <summary>
        /// 将实例转换成字节流
        /// </summary>
        /// <param name="instance">数据实例</param>
        /// <returns></returns>
        public static byte[] ConvertInstanceToData(object instance)
        {
            byte[] data = null;
            try
            {
                string strContent = ConvertInstanceToJsonString(instance);
                if (!string.IsNullOrEmpty(strContent))
                    data = Encoding.UTF8.GetBytes(strContent);
            }
            catch (Exception e)
            {
                UnityEngine.Debug.LogError(e);
            }
            return data;
        }

        /// <summary>
        /// 将实例转换成Json格式字符串描述
        /// </summary>
        /// <param name="instance">实例</param>
        /// <returns></returns>
        public static string ConvertInstanceToJsonString(object instance)
        {
            string result = string.Empty;
            try
            {
                JObject jObject = ConvertInstanceToJObject(instance);
                if (jObject != null)
                {
                    result = jObject.ToString();
                }
            }
            catch (Exception e)
            {
                UnityEngine.Debug.LogError(e);
            }
            return result;
        }

        /// <summary>
        /// 将实例转换成JObject类型描述
        /// </summary>
        /// <param name="instance">实例</param>
        /// <returns></returns>
        public static JObject ConvertInstanceToJObject(object instance)
        {
            JObject jObject = new JObject();
            ;
            try
            {
                System.Type type = instance.GetType();
                jObject["AssemblyName"] = type.Assembly.GetName().Name;
                jObject["TypeName"] = type.FullName;
                //设置属性
                PropertyInfo[] properties = type.GetProperties();
                    //PropertyInfo[] staticProperties = type.GetProperties(BindingFlags.Static);
                if (properties != null && properties.Length > 0)
                {
                    foreach (PropertyInfo property in properties)
                    {
                        if (property.CanWrite && property.Name.CompareTo("Item") != 0)
                        {
                            object[] objRegardless = property.GetCustomAttributes(typeof (RegardlessAttribute), true);
                            if (objRegardless == null || objRegardless.Length == 0)
                            {
                                //object objValue = property.GetValue(instance, null);
                                object objValue = null;
                                try
                                {
                                    objValue = type.InvokeMember(property.Name,
                                        BindingFlags.GetProperty | BindingFlags.Public, null, instance, new object[] {});
                                }
                                catch (Exception e)
                                {
                                    UnityEngine.Debug.LogError(e);
                                }
                                if (objValue != null)
                                {
                                    if (IsPrimitiveType(property.PropertyType)) //基础类型直接赋值
                                    {
                                        jObject[property.Name] = objValue.ToString();
                                    }
                                    else if (typeof (IList).IsAssignableFrom(property.PropertyType)) //集合类型循环赋值
                                    {
                                        JArray jItems = GetJArrayValueByCollection(objValue);
                                        jObject[property.Name] = jItems;
                                    }
                                    else if (typeof (IDictionary).IsAssignableFrom(property.PropertyType))
                                    {
                                        JArray jItems = GetJArrayValueByDictionary(objValue);
                                        jObject[property.Name] = jItems;
                                    }
                                    else if (property.PropertyType.IsClass || property.PropertyType.IsValueType)
                                    {
                                        JObject jClassObjcet = ConvertInstanceToJObject(objValue);
                                        if (jClassObjcet != null)
                                        {
                                            jObject[property.Name] = jClassObjcet;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                //设置字段
                FieldInfo[] fields = type.GetFields();
                if (fields != null && fields.Length > 0)
                {
                    foreach (FieldInfo field in fields)
                    {
                        bool canCal = true;
                        object[] objRegardless = field.GetCustomAttributes(typeof (RegardlessAttribute), true);
                        if (objRegardless != null && objRegardless.Length > 0)
                        {
                            canCal = false;
                        }
                        else if (!field.IsPublic || field.IsStatic)
                        {
                            canCal = false;
                        }
                        if (canCal)
                        {
                            object objValue = null;
                            try
                            {
                                objValue = field.GetValue(instance);
                            }
                            catch (Exception e)
                            {
                                UnityEngine.Debug.LogError(e);
                            }
                            if (objValue != null)
                            {
                                if (IsPrimitiveType(field.FieldType))
                                {
                                    jObject[field.Name] = objValue.ToString();
                                }
                                else if (typeof (IList).IsAssignableFrom(field.FieldType))
                                {
                                    JArray jItems = GetJArrayValueByCollection(objValue);
                                    jObject[field.Name] = jItems;
                                }
                                else if (typeof (IDictionary).IsAssignableFrom(field.FieldType))
                                {
                                    JArray jItems = GetJArrayValueByDictionary(objValue);
                                    jObject[field.Name] = jItems;
                                }
                                else if (field.FieldType.IsClass || field.FieldType.IsValueType)
                                {
                                    JObject jClassObjcet = ConvertInstanceToJObject(objValue);
                                    if (jClassObjcet != null)
                                    {
                                        jObject[field.Name] = jClassObjcet;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                UnityEngine.Debug.LogError(e);
            }
            return jObject;
        }

        #endregion

        #region 输入相关

        /// <summary>
        /// 将数据文件转换到实例
        /// </summary>
        /// <param name="instance">数据实例</param>
        /// <param name="filePath">数据文件路径</param>
        /// <remarks>
        /// 忽略<see cref="RegardlessAttribute"/>属性
        /// </remarks>
        /// <returns></returns>
        public static bool ConvertFileToInstance(object instance, string filePath)
        {
            bool result = false;
            if (!string.IsNullOrEmpty(filePath) && File.Exists(filePath))
            {
                string strContent = File.ReadAllText(filePath);

                result = ConvertJsonStringToInstance(instance, strContent);
            }
            return result;
        }

        /// <summary>
        /// 将json字符串转换成实例
        /// </summary>
        /// <param name="instance">实例</param>
        /// <param name="jsonString">json格式字符串</param>
        /// <returns></returns>
        public static bool ConvertJsonStringToInstance(object instance, string jsonString)
        {
            bool result = false;
            JObject jObject = JObject.Parse(jsonString);
            result = ConvertJObjectToInstance(instance, jObject);
            return result;
        }

        /// <summary>
        /// 将JObject转换成实例
        /// </summary>
        /// <param name="instance">实例</param>
        /// <param name="jObject">JSon类型Object</param>
        /// <returns></returns>
        public static bool ConvertJObjectToInstance(object instance, JObject jObject)
        {
            bool result = false;
            try
            {
                System.Type type = instance.GetType();
                //设置属性
                PropertyInfo[] properties = type.GetProperties();
                if (properties != null && properties.Length > 0)
                {
                    foreach (PropertyInfo property in properties)
                    {
                        if (property.CanWrite && property.Name.CompareTo("Item") != 0)
                        {
                            object[] objRegardless = property.GetCustomAttributes(typeof (RegardlessAttribute), true);
                            if (objRegardless == null || objRegardless.Length == 0)
                            {
                                JToken jTokenValue = null;
                                if (jObject.TryGetValue(property.Name, out jTokenValue))
                                {
                                    if (IsPrimitiveType(property.PropertyType)) //基础类型直接赋值
                                    {
                                        if (property.PropertyType.IsEnum)
                                        {
                                            var value = Enum.Parse(property.PropertyType, jTokenValue.ToString());
                                            property.SetValue(instance, value, null);
                                        }
                                        else
                                        {
                                            property.SetValue(instance,
                                                string.IsNullOrEmpty(jTokenValue.ToString())
                                                    ? null
                                                    : Convert.ChangeType(jTokenValue.ToString(), property.PropertyType),
                                                null);
                                        }
                                    }
                                    else if (typeof (IList).IsAssignableFrom(property.PropertyType)) //集合类型循环赋值
                                    {
                                        object objPropertyValue = Activator.CreateInstance(property.PropertyType);
                                        if (objPropertyValue != null)
                                        {
                                            SetValueByCollection(objPropertyValue, jTokenValue);
                                            property.SetValue(instance, objPropertyValue, null);
                                        }
                                    }
                                    else if (typeof (IDictionary).IsAssignableFrom(property.PropertyType))
                                    {
                                        object objPropertyValue = Activator.CreateInstance(property.PropertyType);
                                        if (objPropertyValue != null)
                                        {
                                            SetValueByDictionary(objPropertyValue, jTokenValue);
                                            property.SetValue(instance, objPropertyValue, null);
                                        }
                                    }
                                    else if (property.PropertyType.IsClass || property.PropertyType.IsValueType)
                                    {
                                        object objPropertyValue = ConvertJObjectToInstance((JObject) jTokenValue,
                                            property.PropertyType);
                                        property.SetValue(instance, objPropertyValue, null);
                                    }
                                }
                            }
                        }
                    }
                }
                //设置字段
                FieldInfo[] fields = type.GetFields();
                if (fields != null && fields.Length > 0)
                {
                    foreach (FieldInfo field in fields)
                    {
                        bool canCal = true;
                        object[] objRegardless = field.GetCustomAttributes(typeof (RegardlessAttribute), true);
                        if (objRegardless != null && objRegardless.Length > 0)
                        {
                            canCal = false;
                        }
                        else if (field.IsStatic)
                        {
                            canCal = false;
                        }
                        if (canCal)
                        {
                            JToken jValue = null;
                            if (jObject.TryGetValue(field.Name, out jValue))
                            {
                                if (IsPrimitiveType(field.FieldType))
                                {
                                    object value = GetPrimitiveTypeValue(field.FieldType, jValue.ToString());
                                    field.SetValue(instance, value);
                                }
                                else if (typeof (IList).IsAssignableFrom(field.FieldType))
                                {
                                    object objPropertyValue = Activator.CreateInstance(field.FieldType);
                                    if (objPropertyValue != null)
                                    {
                                        SetValueByCollection(objPropertyValue, jValue);
                                        field.SetValue(instance, objPropertyValue);
                                    }
                                }
                                else if (typeof (IDictionary).IsAssignableFrom(field.FieldType))
                                {
                                    object objPropertyValue = Activator.CreateInstance(field.FieldType);
                                    if (objPropertyValue != null)
                                    {
                                        SetValueByDictionary(objPropertyValue, jValue);
                                        field.SetValue(instance, objPropertyValue);
                                    }
                                }
                                else if (field.FieldType.IsClass || field.FieldType.IsValueType)
                                {
                                    object objPropertyValue = ConvertJObjectToInstance((JObject) jValue, field.FieldType);
                                    field.SetValue(instance, objPropertyValue);
                                }
                            }
                        }
                    }
                }
                result = true;
            }
            catch (Exception e)
            {
                UnityEngine.Debug.LogError(e);
            }
            return result;
        }

        public static T ConvertFileToInstance<T>(string filePath)
        {
            T result = default(T);
            if (!string.IsNullOrEmpty(filePath) && File.Exists(filePath))
            {
                string strContent = File.ReadAllText(filePath);
                result = ConvertJsonStringToInstance<T>(strContent);
            }
            return result;
        }

        public static T ConvertDataToInstance<T>(byte[] data)
        {
            T result = default(T);
            if (data != null)
            {
                string strContent = Encoding.UTF8.GetString(data);
                result = ConvertJsonStringToInstance<T>(strContent);
            }
            return result;
        }

        public static T ConvertJsonStringToInstance<T>(string jsonString)
        {
            JObject jObject = JObject.Parse(jsonString);
            return ConvertJObjectToInstance<T>(jObject);
        }

        public static T ConvertJObjectToInstance<T>(JObject jObject)
        {
            T result = default(T);
            Type type = typeof (T);
            try
            {
                result = (T) Activator.CreateInstance(type);
                if (result != null)
                {
                    //设置属性
                    PropertyInfo[] properties = type.GetProperties();
                    if (properties != null && properties.Length > 0)
                    {
                        foreach (PropertyInfo property in properties)
                        {
                            if (property.CanWrite && property.Name.CompareTo("Item") != 0) //过滤非可写属性和自身集合索引属性
                            {
                                object[] objRegardless = property.GetCustomAttributes(typeof (RegardlessAttribute), true);
                                if (objRegardless == null || objRegardless.Length == 0)
                                {
                                    JToken jValue = null;
                                    if (jObject.TryGetValue(property.Name, out jValue))
                                    {
                                        if (IsPrimitiveType(property.PropertyType))
                                        {
                                            object value = GetPrimitiveTypeValue(property.PropertyType,
                                                jValue.ToString());
                                            property.SetValue(result, value, null);
                                        }
                                        else if (typeof (IList).IsAssignableFrom(property.PropertyType))
                                        {
                                            object objPropertyValue = Activator.CreateInstance(property.PropertyType);
                                            if (objPropertyValue != null)
                                            {
                                                SetValueByCollection(objPropertyValue, jValue);
                                                property.SetValue(result, objPropertyValue, null);
                                            }
                                        }
                                        else if (typeof (IDictionary).IsAssignableFrom(property.PropertyType))
                                        {
                                            object objPropertyValue = Activator.CreateInstance(property.PropertyType);
                                            if (objPropertyValue != null)
                                            {
                                                SetValueByDictionary(objPropertyValue, jValue);
                                                property.SetValue(result, objPropertyValue, null);
                                            }
                                        }
                                        else if (property.PropertyType.IsClass || property.PropertyType.IsValueType)
                                        {
                                            object objPropertyValue = ConvertJObjectToInstance((JObject) jValue,
                                                property.PropertyType);
                                            property.SetValue(result, objPropertyValue, null);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    //设置字段
                    FieldInfo[] fields = type.GetFields();
                    if (fields != null && fields.Length > 0)
                    {
                        foreach (FieldInfo field in fields)
                        {
                            bool canCal = true;
                            object[] objRegardless = field.GetCustomAttributes(typeof (RegardlessAttribute), true);
                            if (objRegardless != null && objRegardless.Length > 0)
                            {
                                canCal = false;
                            }
                            else if (field.IsStatic)
                            {
                                canCal = false;
                            }
                            if (canCal)
                            {
                                JToken jValue = null;
                                if (jObject.TryGetValue(field.Name, out jValue))
                                {
                                    if (IsPrimitiveType(field.FieldType))
                                    {
                                        object value = GetPrimitiveTypeValue(field.FieldType, jValue.ToString());
                                        field.SetValue(result, value);
                                    }
                                    else if (typeof (IList).IsAssignableFrom(field.FieldType))
                                    {
                                        object objPropertyValue = Activator.CreateInstance(field.FieldType);
                                        if (objPropertyValue != null)
                                        {
                                            SetValueByCollection(objPropertyValue, jValue);
                                            field.SetValue(result, objPropertyValue);
                                        }
                                    }
                                    else if (typeof (IDictionary).IsAssignableFrom(field.FieldType))
                                    {
                                        object objPropertyValue = Activator.CreateInstance(field.FieldType);
                                        if (objPropertyValue != null)
                                        {
                                            SetValueByDictionary(objPropertyValue, jValue);
                                            field.SetValue(result, objPropertyValue);
                                        }
                                    }
                                    else if (field.FieldType.IsClass || field.FieldType.IsValueType)
                                    {
                                        object objPropertyValue = ConvertJObjectToInstance((JObject) jValue,
                                            field.FieldType);
                                        field.SetValue(result, objPropertyValue);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                UnityEngine.Debug.LogError(e);
            }

            return result;
        }

        private static object ConvertJObjectToInstance(JObject jObject, Type type)
        {
            object result = null;
            JToken jTokenAssembly = null;
            JToken jTokenType = null;
            if (jObject.TryGetValue("AssemblyName", out jTokenAssembly) &&
                jObject.TryGetValue("TypeName", out jTokenType))
            {
                ObjectHandle handler = Activator.CreateInstance(jTokenAssembly.ToString(), jTokenType.ToString());
                if (handler != null)
                {
                    result = handler.Unwrap();
                    type = result.GetType();
                }
            }
            else
            {
                result = Activator.CreateInstance(type);
            }
            if (result != null)
            {
                //设置属性
                PropertyInfo[] properties = type.GetProperties();
                if (properties != null && properties.Length > 0)
                {
                    foreach (PropertyInfo property in properties)
                    {
                        if (property.CanWrite && property.Name.CompareTo("Item") != 0) //过滤非可写属性和自身集合索引属性
                        {
                            object[] objRegardless = property.GetCustomAttributes(typeof (RegardlessAttribute), true);
                            if (objRegardless == null || objRegardless.Length == 0)
                            {
                                JToken jValue = null;
                                if (jObject.TryGetValue(property.Name, out jValue))
                                {
                                    if (IsPrimitiveType(property.PropertyType)) //基础类型直接赋值
                                    {
                                        object value = GetPrimitiveTypeValue(property.PropertyType, jValue.ToString());
                                        property.SetValue(result, value, null);
                                    }
                                    else if (typeof (IList).IsAssignableFrom(property.PropertyType))
                                    {
                                        object objPropertyValue = Activator.CreateInstance(property.PropertyType);
                                        if (objPropertyValue != null)
                                        {
                                            SetValueByCollection(objPropertyValue, jValue);
                                            property.SetValue(result, objPropertyValue, null);
                                        }
                                    }
                                    else if (typeof (IDictionary).IsAssignableFrom(property.PropertyType))
                                    {
                                        object objPropertyValue = Activator.CreateInstance(property.PropertyType);
                                        if (objPropertyValue != null)
                                        {
                                            SetValueByDictionary(objPropertyValue, jValue);
                                            property.SetValue(result, objPropertyValue, null);
                                        }
                                    }
                                    else if (property.PropertyType.IsClass || property.PropertyType.IsValueType)
                                    {
                                        object objPropertyValue = ConvertJObjectToInstance((JObject) jValue,
                                            property.PropertyType);
                                        property.SetValue(result, objPropertyValue, null);
                                    }
                                }
                            }
                        }
                    }
                }
                //设置字段
                FieldInfo[] fields = type.GetFields();
                if (fields != null && fields.Length > 0)
                {
                    foreach (FieldInfo field in fields)
                    {
                        bool canCal = true;
                        object[] objRegardless = field.GetCustomAttributes(typeof (RegardlessAttribute), true);
                        if (objRegardless != null && objRegardless.Length > 0)
                        {
                            canCal = false;
                        }
                        else if (!field.IsPublic || field.IsStatic)
                        {
                            canCal = false;
                        }
                        if (canCal)
                        {
                            JToken jValue = null;
                            if (jObject.TryGetValue(field.Name, out jValue))
                            {
                                if (IsPrimitiveType(field.FieldType))
                                {
                                    object value = GetPrimitiveTypeValue(field.FieldType, jValue.ToString());
                                    field.SetValue(result, value);
                                }
                                else if (typeof (IList).IsAssignableFrom(field.FieldType))
                                {
                                    object objPropertyValue = Activator.CreateInstance(field.FieldType);
                                    if (objPropertyValue != null)
                                    {
                                        SetValueByCollection(objPropertyValue, jValue);
                                        field.SetValue(result, objPropertyValue);
                                    }
                                }
                                else if (typeof (IDictionary).IsAssignableFrom(field.FieldType))
                                {
                                    object objPropertyValue = Activator.CreateInstance(field.FieldType);
                                    if (objPropertyValue != null)
                                    {
                                        SetValueByDictionary(objPropertyValue, jValue as JArray);
                                        field.SetValue(result, objPropertyValue);
                                    }
                                }
                                else if (field.FieldType.IsClass || field.FieldType.IsValueType)
                                {
                                    object objPropertyValue = ConvertJObjectToInstance((JObject) jValue, field.FieldType);
                                    field.SetValue(result, objPropertyValue);
                                }
                            }
                        }
                    }
                }
            }
            return result;
        }

        #endregion

        private static object GetPrimitiveTypeValue(Type type, string strValue)
        {
            object value = null;
            if (type.IsEnum)
            {
                value = Enum.Parse(type, strValue);
            }
            else if (type == typeof (String))
            {
                if (string.IsNullOrEmpty(strValue))
                {
                    value = string.Empty;
                }
                else
                {
                    value = Convert.ChangeType(strValue, type);
                }
            }
            else
            {
                if (!string.IsNullOrEmpty(strValue))
                {
                    value = Convert.ChangeType(strValue, type);
                }
            }
            return value;
        }

        private static JArray GetJArrayValueByCollection(object objValue)
        {
            JArray jItems = new JArray();
            if (objValue is IEnumerable)
            {
                foreach (object objValueSub in (IEnumerable) objValue)
                {
                    Type typeCollectionItem = objValueSub.GetType();
                    object jValueSub = null;
                    if (IsPrimitiveType(typeCollectionItem))
                    {
                        //jValueSub = objValueSub.ToString();

                        JObject jObject = new JObject();
                        System.Type type = objValueSub.GetType();
                        jObject["AssemblyName"] = type.Assembly.GetName().Name;
                        jObject["TypeName"] = type.FullName;
                        jObject["JValue"] = objValueSub.ToString();
                        jValueSub = jObject;
                    }
                    else if (typeof (IList).IsAssignableFrom(typeCollectionItem))
                    {
                        jValueSub = GetJArrayValueByCollection(objValueSub);
                    }
                    else if (typeof (IDictionary).IsAssignableFrom(typeCollectionItem))
                    {
                        jValueSub = GetJArrayValueByDictionary(objValueSub);
                    }
                    else if (typeCollectionItem.IsClass || typeCollectionItem.IsValueType)
                    {
                        jValueSub = ConvertInstanceToJObject(objValueSub);
                    }
                    if (jValueSub != null)
                    {
                        jItems.Add(jValueSub);
                    }
                }
            }
            return jItems;
        }

        private static void SetValueByCollection(object objPropertyValue, JToken jArrayValue)
        {
            foreach (JToken objValueSub in jArrayValue as JArray)
            {
                object value = null;
                bool isClassOrStruct = false;
                try
                {
                    string strAssemblyName = objValueSub["AssemblyName"].ToString();
                    string strTypeName = objValueSub["TypeName"].ToString();
                    ObjectHandle handler = Activator.CreateInstance(strAssemblyName.ToString(), strTypeName.ToString());
                    if (handler != null)
                    {
                        isClassOrStruct = true;
                        value = handler.Unwrap();
                        JObject jObject = JObject.Parse(objValueSub.ToString());
                        ConvertJObjectToInstance(value, jObject);

                        JToken token;
                        if (jObject.TryGetValue("JValue", out token))
                        {
                            object jvalue = GetPrimitiveTypeValue(value.GetType(), token.ToString());
                            value = jvalue;
                        }
                    }
                }
                catch
                {
                }
                if (!isClassOrStruct)
                {
                    if (objValueSub is JArray) //集合
                    {
                        SetValueByCollection(objPropertyValue, objValueSub);
                    }
                    else
                    {
                        value = objValueSub.ToString();
                    }
                }

                if (value != null)
                {
                    (objPropertyValue as IList).Add(value);
                }
            }
        }

        private static void SetValueByCollection(object objPropertyValue, object objValueSub)
        {
            Type type = objValueSub.GetType();
            object value = null;
            if (IsPrimitiveType(type))
            {
                value = GetPrimitiveTypeValue(type, objValueSub.ToString());
            }
            else if ((typeof (IList).IsAssignableFrom(type)))
            {
                foreach (object objValueSubSub in objValueSub as IEnumerable)
                {
                    SetValueByCollection(objValueSub, objValueSubSub);
                }
            }
            else if ((typeof (Directory).IsAssignableFrom(type)))
            {
                SetValueByDictionary(objPropertyValue, objValueSub);
            }
            else if (type.IsClass || type.IsValueType)
            {
                value = ConvertToInstance(objValueSub);
            }
            if (value != null)
            {
                (objPropertyValue as IList).Add(value);
            }
        }

        private static JArray GetJArrayValueByDictionary(object objValue)
        {
            JArray jItems = new JArray();
            if (objValue != null && objValue is IDictionary)
            {
                IDictionary dicValue = objValue as IDictionary;
                foreach (object key in dicValue.Keys)
                {
                    JObject jObject = new JObject();
                    //读取key值
                    Type typeKey = key.GetType();
                    object objectKey = null;
                    if (IsPrimitiveType(typeKey))
                    {
                        objectKey = key.ToString();
                    }
                    else if (typeof (IList).IsAssignableFrom(typeKey))
                    {
                        objectKey = GetJArrayValueByCollection(key);
                    }
                    else if (typeof (IDictionary).IsAssignableFrom(typeKey))
                    {
                        objectKey = GetJArrayValueByDictionary(key);
                    }
                    else if (typeKey.IsClass || typeKey.IsValueType)
                    {
                        objectKey = ConvertInstanceToJObject(key);
                    }
                    jObject["key"] = objectKey.ToString();
                    //读取value值
                    object value = dicValue[key];
                    Type typeValue = value.GetType();
                    object objectValue = null;
                    if (IsPrimitiveType(typeValue))
                    {
                        objectValue = value.ToString();
                    }
                    else if (typeof (IList).IsAssignableFrom(typeValue))
                    {
                        objectValue = GetJArrayValueByCollection(value);
                    }
                    else if (typeof (IDictionary).IsAssignableFrom(typeValue))
                    {
                        objectValue = GetJArrayValueByDictionary(value);
                    }
                    else if (typeValue.IsClass || typeValue.IsValueType)
                    {
                        objectValue = ConvertInstanceToJObject(value);
                    }
                    jObject["value"] = objectValue.ToString();
                    //添加keyvalue
                    jItems.Add(jObject);
                }
            }
            return jItems;
        }

        private static void SetValueByDictionary(object objPropertyValue, JToken jArrayDictronaryValues)
        {
            IDictionary dictionary = objPropertyValue as IDictionary;
            if (dictionary != null)
            {
                Type[] types = dictionary.GetType().GetGenericArguments();
                if (types != null && types.Length == 2)
                {
                    Type typeKey = types[0];
                    Type typeValue = types[1];
                    foreach (JToken objValueSub in jArrayDictronaryValues as JArray)
                    {
                        try
                        {
                            //获取key值
                            object objKey = ConvertStringToInstance(typeKey, objValueSub["key"].ToString());
                            //获取value值
                            object objValue = ConvertStringToInstance(typeValue, objValueSub["value"].ToString());
                            //设置字典
                            dictionary.Add(objKey, objValue);
                        }
                        catch (Exception e)
                        {
                            UnityEngine.Debug.LogError(e);
                        }
                    }
                }
            }
        }

        private static object ConvertStringToInstance(Type type, string strJson)
        {
            object objKey = null;
            if (IsPrimitiveType(type) || type.IsValueType) //基础类型直接赋值
            {
                if (type.IsEnum)
                {
                    objKey = Enum.Parse(type, strJson);
                }
                else
                {
                    objKey = string.IsNullOrEmpty(strJson) ? null : Convert.ChangeType(strJson, type);
                }
            }
            else if (typeof (IList).IsAssignableFrom(type)) //集合类型循环赋值
            {
                objKey = Activator.CreateInstance(type);
                SetValueByCollection(objKey, JArray.Parse(strJson));
            }
            else if (typeof (IDictionary).IsAssignableFrom(type))
            {
                objKey = Activator.CreateInstance(type);
                SetValueByDictionary(objKey, JObject.Parse(strJson));
            }
            else if (type.IsClass || type.IsValueType)
            {
                objKey = ConvertJObjectToInstance(JObject.Parse(strJson), type);
            }
            return objKey;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="objTargetValue">目标字典</param>
        /// <param name="objValue">源字典</param>
        private static void SetValueByDictionary(object objTargetValue, object objValue)
        {
            IDictionary dicOriginal = objValue as IDictionary;
            IDictionary dicTarget = objTargetValue as IDictionary;
            if (dicOriginal != null)
            {
                foreach (object key in dicOriginal.Keys)
                {
                    //获取key值
                    object targetKey = ConvertObjectToInstance(key);
                    //获取value值
                    object targetValue = ConvertObjectToInstance(dicOriginal[key]);
                    //设置字典
                    dicTarget.Add(targetKey, targetValue);
                }
            }
        }

        private static object ConvertObjectToInstance(object value)
        {
            Type type = value.GetType();
            object result = null;
            if (IsPrimitiveType(type) || type.IsValueType) //基础类型直接赋值
            {
                result = value;
            }
            else if (typeof (IList).IsAssignableFrom(type)) //集合类型循环赋值
            {
                result = Activator.CreateInstance(type);
                for (int i = 0; i < (value as IList).Count; i++)
                {
                    object item = ConvertObjectToInstance((value as IList)[i]);
                    (result as IList).Add(item);
                }
            }
            else if (typeof (IDictionary).IsAssignableFrom(type))
            {
                result = Activator.CreateInstance(type);
                SetValueByDictionary(result, value);
            }
            else if (type.IsClass || type.IsValueType)
            {
                result = ConvertToInstance(value);
            }
            return result;
        }

        /// <summary>
        /// 判断是否是原始类型
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        private static bool IsPrimitiveType(Type type)
        {
            if (type.IsGenericType && type.GetGenericTypeDefinition() == typeof (Nullable<>)) //is Nullable type
            {
                type = Nullable.GetUnderlyingType(type);
            }
            bool result = false;
            if (type == typeof (DateTimeOffset))
                result = true;
            else if (type == typeof (byte[]))
                result = true;
            else if (type == typeof (Uri))
                result = true;
            else if (type == typeof (TimeSpan))
                result = true;
            else if (type == typeof (Guid))
                result = true;
            else if (type.BaseType == typeof (Enum))
                result = true;
            else
            {
                switch (Type.GetTypeCode(type))
                {
                    case TypeCode.String:
                    case TypeCode.Char:
                    case TypeCode.Boolean:
                    case TypeCode.SByte:
                    case TypeCode.Int16:
                    case TypeCode.UInt16:
                    case TypeCode.Int32:
                    case TypeCode.Byte:
                    case TypeCode.UInt32:
                    case TypeCode.Int64:
                    case TypeCode.UInt64:
                    case TypeCode.Single:
                    case TypeCode.Double:
                    case TypeCode.DateTime:
                    case TypeCode.Decimal:
                    case TypeCode.DBNull:
                        result = true;
                        break;
                }
            }
            return result;
        }

        #region 数据复制相关

        /// <summary>
        /// 将数据复制到新实例
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="objData">数据源</param>
        /// <returns></returns>
        public static object ConvertToInstance(object objData)
        {
            object result = null;
            Type type = objData.GetType();
            try
            {
                if (IsPrimitiveType(type) || type.IsValueType)
                {
                    result = objData;
                }
                else
                {
                    result = Activator.CreateInstance(type);
                    if (result != null)
                    {
                        #region 设置属性

                        //PropertyInfo[] properties = type.GetProperties();
                        //if (properties != null && properties.Length > 0)
                        //{
                        //    foreach (PropertyInfo property in properties)
                        //    {
                        //        if (property.CanWrite && property.Name.CompareTo("Item") != 0)//过滤非可写属性和自身集合索引属性
                        //        {
                        //            object objValue = null;
                        //            try
                        //            {
                        //                objValue = type.InvokeMember(property.Name, BindingFlags.GetProperty | BindingFlags.Public, null, objData, new object[] { });
                        //            }
                        //            catch (Exception e)
                        //            {
                        //                UnityEngine.Debug.LogError(e);
                        //            }
                        //            if (objValue != null)
                        //            {
                        //                bool isClone = false;
                        //                object[] objClone = property.GetCustomAttributes(typeof(CloneCopyAttribute), true);
                        //                if (objClone != null && objClone.Length > 0)
                        //                {
                        //                    isClone = true;
                        //                }
                        //                if (IsPrimitiveType(property.PropertyType))//基础类型直接赋值
                        //                {
                        //                    object value = GetPrimitiveTypeValue(property.PropertyType, objValue.ToString());
                        //                    property.SetValue(result, value, null);
                        //                }
                        //                else if (typeof(IList).IsAssignableFrom(property.PropertyType))//集合类型循环赋值
                        //                {
                        //                    if (isClone)
                        //                    {
                        //                        property.SetValue(result, objValue, null);
                        //                    }
                        //                    else
                        //                    {
                        //                        object objPropertyValue = Activator.CreateInstance(property.PropertyType);
                        //                        if (objPropertyValue != null)
                        //                        {
                        //                            foreach (object objValueSub in objValue as IEnumerable)
                        //                            {
                        //                                SetValueByCollection(objPropertyValue, objValueSub);
                        //                            }
                        //                            property.SetValue(result, objPropertyValue, null);
                        //                        }
                        //                    }
                        //                }
                        //                else if (typeof(Directory).IsAssignableFrom(property.PropertyType))//集合类型循环赋值
                        //                {
                        //                    if (isClone)
                        //                    {
                        //                        property.SetValue(result, objValue, null);
                        //                    }
                        //                    else
                        //                    {
                        //                        object objPropertyValue = Activator.CreateInstance(property.PropertyType);
                        //                        if (objPropertyValue != null)
                        //                        {
                        //                            foreach (object objValueSub in objValue as IEnumerable)
                        //                            {

                        //                            }
                        //                            property.SetValue(result, objPropertyValue, null);
                        //                        }
                        //                    }
                        //                }
                        //                else if (property.PropertyType.IsValueType)
                        //                {
                        //                    object objPropertyValue = ConvertToInstance(objValue);
                        //                    property.SetValue(result, objPropertyValue, null);
                        //                }
                        //                else if (property.PropertyType.IsClass)
                        //                {
                        //                    if (isClone)
                        //                    {
                        //                        property.SetValue(result, objValue, null);
                        //                    }
                        //                    else
                        //                    {
                        //                        object objCopyValue = ConvertToInstance(objValue);
                        //                        property.SetValue(result, objCopyValue, null);
                        //                    }
                        //                }
                        //            }
                        //        }
                        //    }
                        //}

                        #endregion

                        #region 设置字段

                        FieldInfo[] fields =
                            type.GetFields(BindingFlags.NonPublic | BindingFlags.Public | BindingFlags.Instance);
                        if (fields != null && fields.Length > 0)
                        {
                            foreach (FieldInfo field in fields)
                            {
                                if (!field.IsStatic && field.Name.CompareTo("Item") != 0) //过滤静态变量和自身集合索引属性
                                {
                                    object objValue = null;
                                    try
                                    {
                                        objValue = field.GetValue(objData);
                                    }
                                    catch (Exception e)
                                    {
                                        UnityEngine.Debug.LogError(e);
                                    }
                                    if (objValue != null)
                                    {
                                        bool isClone = false;
                                        object[] objClone = field.GetCustomAttributes(typeof (CloneCopyAttribute), true);
                                        if (objClone != null && objClone.Length > 0)
                                        {
                                            isClone = true;
                                        }

                                        bool isRegardless = false;
                                        object[] objRegardless = field.GetCustomAttributes(
                                            typeof (RegardlessAttribute), true);
                                        if (objRegardless != null && objRegardless.Length > 0)
                                        {
                                            isRegardless = true;
                                        }

                                        if (IsPrimitiveType(field.FieldType))
                                        {
                                            if (isRegardless)
                                            {
                                                field.SetValue(result, null);
                                            }
                                            else
                                            {
                                                object value = GetPrimitiveTypeValue(field.FieldType,
                                                    objValue.ToString());
                                                field.SetValue(result, value);
                                            }
                                        }
                                        else if (typeof (IList).IsAssignableFrom(field.FieldType))
                                        {
                                            if (isClone)
                                            {
                                                field.SetValue(result, objValue);
                                            }
                                            else if (isRegardless)
                                            {
                                                field.SetValue(result, null);
                                            }
                                            else
                                            {
                                                try
                                                {
                                                    object objPropertyValue = Activator.CreateInstance(field.FieldType);
                                                    if (objPropertyValue != null)
                                                    {
                                                        foreach (object objValueSub in objValue as IEnumerable)
                                                        {
                                                            object objCopyValue = ConvertToInstance(objValueSub);
                                                            SetValueByCollection(objPropertyValue, objCopyValue);
                                                        }
                                                        field.SetValue(result, objPropertyValue);
                                                    }
                                                }
                                                catch (Exception e)
                                                {
                                                    field.SetValue(result, objValue);
                                                }
                                            }
                                        }
                                        else if (typeof (IDictionary).IsAssignableFrom(field.FieldType))
                                        {
                                            if (isClone)
                                            {
                                                field.SetValue(result, objValue);
                                            }
                                            else
                                            {
                                                object objPropertyValue = null;
                                                try
                                                {
                                                    objPropertyValue = Activator.CreateInstance(field.FieldType);
                                                    if (objPropertyValue != null)
                                                    {
                                                        SetValueByDictionary(objPropertyValue, objValue);
                                                        field.SetValue(result, objPropertyValue);
                                                    }
                                                }
                                                catch (Exception e)
                                                {
                                                    field.SetValue(result, objValue);
                                                }
                                            }
                                        }
                                        else if (field.FieldType.IsValueType)
                                        {
                                            object objPropertyValue = ConvertToInstance(objValue);
                                            field.SetValue(result, objPropertyValue);
                                        }
                                        else if (field.FieldType.IsClass)
                                        {
                                            if (isClone)
                                            {
                                                field.SetValue(result, objValue);
                                            }
                                            else if (isRegardless)
                                            {
                                                field.SetValue(result, null);
                                            }
                                            else
                                            {
                                                object objCopyValue = ConvertToInstance(objValue);
                                                field.SetValue(result, objCopyValue);
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        #endregion
                    }
                }
            }
            catch (Exception e)
            {
                UnityEngine.Debug.LogError(e);
            }
            return result;
        }

        #endregion
    }
}