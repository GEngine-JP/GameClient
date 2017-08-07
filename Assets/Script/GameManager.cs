using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class GameManager {
    private static GameManager instance;

    /// <summary>
    /// 获取一个gameManager的实例
    /// </summary>
    public static GameManager getInstance
    {
        get

        {
            if (instance == null)
            {
                instance = new GameManager();
            }
            return instance;
        }
    }

    /// <summary>
    /// 切换场景
    /// </summary>
    /// <param name="sceneName"></param>
    public void LoadScence(string sceneName) {
        SceneManager.LoadScene(sceneName);
    }

    /// <summary>
    /// 加载资源
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="path"></param>
    /// <returns></returns>
    public T LoadResources<T>(string path) where T : Object {
        object obj = Resources.Load(path);
        if (obj == null) {
            return null;
       }
        return (T)obj;
    }


    public void HideGameObject(GameObject obj)
    {
        if (obj != null) {
            obj.SetActive(false);
        }
    }

	

}
