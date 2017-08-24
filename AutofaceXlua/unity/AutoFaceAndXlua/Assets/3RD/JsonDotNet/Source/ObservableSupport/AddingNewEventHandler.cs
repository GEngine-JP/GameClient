#if !UNITY_WINRT || UNITY_EDITOR || UNITY_WP8
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Newtonsoft.Json.ObservableSupport
{
	public delegate void AddingNewEventHandler(Object sender, AddingNewEventArgs e);
}

#endif