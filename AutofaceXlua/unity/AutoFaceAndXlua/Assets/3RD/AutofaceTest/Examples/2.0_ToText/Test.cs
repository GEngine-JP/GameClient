using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using Autofac;

namespace AutoFaceTest
{
    public interface IFooTest
    {
        string GetMyString();
    }

    public class FooTest : IFooTest, System.IDisposable
    {
        public static int ActiveCounter = 0;
        public static int DisposeCounter = 0;
        string _text;

        public FooTest()
        {
            FooTest.ActiveCounter++;
            _text = "Autofac works " + string.Format("{0}", System.DateTime.Now);
        }

        public string GetMyString()
        {
            return _text;
        }

        public void Dispose()
        {
            FooTest.ActiveCounter--;
            FooTest.DisposeCounter++;
        }
    }

    public class Test : MonoBehaviour
    {
        // Use this for initialization
        void Update()
        {
            using (var scope = DependencyResolver.Container.BeginLifetimeScope())
            {
                var reader = scope.Resolve<IFooTest>();
                Text txt = this.GetComponent<Text>();
                txt.text = string.Format("[{0}:{1}] {2}", FooTest.ActiveCounter, FooTest.DisposeCounter,
                    reader.GetMyString());
            }
        }
    }
}
