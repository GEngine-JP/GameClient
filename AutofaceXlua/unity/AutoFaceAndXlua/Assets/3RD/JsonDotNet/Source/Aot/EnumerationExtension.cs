#if !UNITY_WINRT || UNITY_EDITOR || UNITY_WP8
#if (UNITY_IOS || UNITY_IPHONE)
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Newtonsoft.Json.Aot
{
	public static class EnumerationExtension
	{
		public static void ForEach<T>(this IEnumerable<T> enumerable, Action<T> action)
		{
			if (enumerable == null)
				return;

            var enumerableType = typeof(IEnumerable);

            if(!enumerable.GetType().GetInterfaces().Contains(enumerableType))
                throw new ArgumentException("Object does not implement IEnumerable", "enumerable");

            var method = enumerableType.GetMethod("GetEnumerator");

			if (method == null)
                throw new InvalidOperationException("Failed to get 'GetEnumerator()' method from IEnumerable type");

			IEnumerator enumerator = null;

			try
			{
                enumerator = (IEnumerator)method.Invoke(enumerable, null);

				if (enumerator != null)
				{
					while (enumerator.MoveNext())
					{
						action((T)enumerator.Current);
					}
				}
				else
				{
                    UnityEngine.Debug.Log(string.Format("{0}.GetEnumerator() returned 'null' instead of IEnumerator.", enumerable.ToString()));
				}
			}
			finally
			{
				var disposable = enumerator as IDisposable;

				if (disposable != null)
                {
					disposable.Dispose();
			}
		}
	}
}
}
#endif

#endif