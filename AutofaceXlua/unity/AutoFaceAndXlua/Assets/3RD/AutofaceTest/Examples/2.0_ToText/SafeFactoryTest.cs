using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using Autofac;

namespace AutoFaceTest
{
    /// <summary>
    /// This is an explicit factory design
    /// </summary>

    public abstract class FactoryAbstract<T>
    {
        ILifetimeScope _scope;

        public FactoryAbstract(ILifetimeScope scope)
        {
            _scope = scope;
        }

        public T Create()
        {
            return _scope.Resolve<T>();
        }
    }

    public class Baz : System.IDisposable
    {
        public static int ActiveCounter = 0;
        public static int DisposeCounter = 0;

        public class Factory : FactoryAbstract<Baz>
        {
            public Factory(ILifetimeScope scope)
                : base(scope)
            {
            }
        }

        string _symbol;

        public Baz()
        {
            Baz.ActiveCounter++;
            _symbol = "SafeFactory works " + string.Format("{0}", System.DateTime.Now);
        }

        public string GetMyString()
        {
            return _symbol;
        }

        public void Dispose()
        {
            Baz.ActiveCounter--;
            Baz.DisposeCounter++;
        }
    }

    public class SafeFactoryTest : MonoBehaviour
    {

        // Use this for initialization
        void Update()
        {
            using (var scope = DependencyResolver.Container.BeginLifetimeScope())
            {
                var factory = scope.Resolve<Baz.Factory>();
                var baz = factory.Create();

                Text txt = this.GetComponent<Text>();
                txt.text = string.Format("[{0}:{1}] {2}", Baz.ActiveCounter, Baz.DisposeCounter, baz.GetMyString());
            }
        }
    }
}