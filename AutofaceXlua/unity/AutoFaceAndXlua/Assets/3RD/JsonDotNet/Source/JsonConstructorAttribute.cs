#if !UNITY_WINRT || UNITY_EDITOR || UNITY_WP8
using System;

namespace Newtonsoft.Json
{
  /// <summary>
  /// Instructs the <see cref="JsonSerializer"/> not to serialize the public field or public read/write property value.
  /// </summary>
  [AttributeUsage(AttributeTargets.Constructor | AttributeTargets.Property, AllowMultiple = false)]
  public sealed class JsonConstructorAttribute : Attribute
  {
  }
}
#endif