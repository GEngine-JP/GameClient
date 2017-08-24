using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using Autofac;

namespace AutoFaceTest
{
    public class Bar
    {
        public delegate Bar Factory(string symbol);

        string _symbol;

        public Bar(string symbol)
        {
            _symbol = symbol;
        }

        public string GetMyString()
        {
            return _symbol;
        }
    }

    public class FactoryTest : MonoBehaviour
    {

        // Use this for initialization
        void Start()
        {
            using (var scope = DependencyResolver.Container.BeginLifetimeScope())
            {
                var factory = scope.Resolve<Bar.Factory>();
                var bar = factory.Invoke("Factory direct");

                Text txt = this.GetComponent<Text>();
                txt.text = bar.GetMyString();
            }
        }
    }
}
