#if !UNITY_WINRT || UNITY_EDITOR || UNITY_WP8
using System;

namespace Newtonsoft.Json.ObservableSupport
{
	public delegate void PropertyChangingEventHandler(Object sender, PropertyChangingEventArgs e);

}

#endif