#if !UNITY_WINRT || UNITY_EDITOR || UNITY_WP8
namespace Newtonsoft.Json.ObservableSupport
{
	public interface INotifyPropertyChanging
	{
		event PropertyChangingEventHandler PropertyChanging;
	}
}

#endif