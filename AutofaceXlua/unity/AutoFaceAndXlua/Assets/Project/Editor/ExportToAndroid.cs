/************************************************************************************* 
**文 件 名：ExportToAndroid 
**创建时间：2017/8/11 星期五 下午 4:07:49 
**作    者：罗弘(email： 243515320@qq.com)
**工    号：102193
**说    明：打包unity工程到 安卓目录下
**版    本：V1.0.0  
**修改时间： 
**修 改 人： 
 *************************************************************************************/
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using System.IO;

public class ExportToAndroid: EditorWindow
{
   

    static string OUTPUT_DIR = "D://output-unity5.4.2f2";

    //要导出的场景
    static string[] scenes = FindScenes();

    //android工程目录，第一次由用户手动设置
    static string ANDROID_ASSETS_DIR;
    static string errorMessage = "";

    /// <summary>
    /// 打包unity工程到安卓目录下
    /// </summary>
    [MenuItem("Tools/ExportToAndroid")]
    static void BuildUnity()
    {
        if (CheckAndroidDir())
        {
            Build();
        }
    }
    static bool CheckAndroidDir()
    {
        ANDROID_ASSETS_DIR = PlayerPrefs.GetString("ANDROID_ASSETS_DIR", "");
        //未设置
        if (string.IsNullOrEmpty(ANDROID_ASSETS_DIR))
        {
            ExportToAndroid window = (ExportToAndroid)EditorWindow.GetWindow(typeof(ExportToAndroid));
            return false;
        }

        //设置的目录无效
        if (!Directory.Exists(ANDROID_ASSETS_DIR))
        {
            ExportToAndroid window = (ExportToAndroid)EditorWindow.GetWindow(typeof(ExportToAndroid));
            return false;
        }

        return true;
    }

    static void Build()
    {
        string outputDeviceDir = Path.Combine(OUTPUT_DIR, "UnityProject");
        Debug.LogFormat("output device dir:{0}", outputDeviceDir);
        //清理输出目录
        if (Directory.Exists(outputDeviceDir))
        {
            DirectoryInfo info = new DirectoryInfo(outputDeviceDir);
            info.Delete(true);
        }

        string androidDeviceDir = Path.Combine(ANDROID_ASSETS_DIR, "assets");
        Debug.LogFormat("android assets device dir:{0}", androidDeviceDir);

        //清理Android工程下的目标目录
        if (Directory.Exists(androidDeviceDir))
        {
            DirectoryInfo info = new DirectoryInfo(androidDeviceDir);
            var fileInfos = info.GetFiles();
            foreach (var fileInfo in fileInfos)
            {
                fileInfo.Delete();
            }
        }

        //Build
        BuildPipeline.BuildPlayer(scenes, outputDeviceDir, BuildTarget.Android, BuildOptions.AcceptExternalModificationsToPlayer);

        //拷贝assets到Android工程
        CopyDirectory(outputDeviceDir + "/" + PlayerSettings.productName + "/assets", androidDeviceDir);

    }


    static bool SkipDelDirectory(string directoryName, string[] filters)
    {
        bool isSkip = false;

        foreach (var name in filters)
        {
            if (name == directoryName)
            {
                isSkip = true;
                break;
            }
        }
        return isSkip;
    }
    static string[] FindScenes()
    {
        List<string> scenes = new List<string>();
        foreach (EditorBuildSettingsScene scene in EditorBuildSettings.scenes)
        {
            if (scene.enabled)
            {
                scenes.Add(scene.path);
                Debug.LogFormat("==========================target scene:{0}", scene.path);
            }
        }

        return scenes.ToArray();
    }

    static void CopyDirectory(string srcDir, string tgtDir)
    {
        DirectoryInfo source = new DirectoryInfo(srcDir);
        DirectoryInfo target = new DirectoryInfo(tgtDir);


        if (!source.Exists)
        {
            return;
        }

        if (!target.Exists)
        {
            target.Create();
        }

        FileInfo[] files = source.GetFiles();

        for (int i = 0; i < files.Length; i++)
        {
            File.Copy(files[i].FullName, target.FullName + @"\" + files[i].Name, true);
        }

        DirectoryInfo[] dirs = source.GetDirectories();

        for (int j = 0; j < dirs.Length; j++)
        {
            CopyDirectory(dirs[j].FullName, target.FullName + @"\" + dirs[j].Name);
        }
    }

    [MenuItem("Tools/ClearAndroidAssetsDir")]
    static void ClearAndroidAssetsDir()
    {
        PlayerPrefs.SetString("ANDROID_ASSETS_DIR", "");
        PlayerPrefs.Save();
    }
    void OnGUI()
    {
        EditorGUILayout.LabelField("请输入Android工程的路径，如E:\\qipai\\AutofaceAndXlua\\AutoFaceAndXlua\\app\\src\\main");
        ANDROID_ASSETS_DIR = EditorGUILayout.TextField(ANDROID_ASSETS_DIR);
        if (GUILayout.Button("保存"))
        {

            if (!Directory.Exists(ANDROID_ASSETS_DIR))
            {
                errorMessage = "输入的目录无效";
                return;
            }

            PlayerPrefs.SetString("ANDROID_ASSETS_DIR", ANDROID_ASSETS_DIR);
            PlayerPrefs.Save();

            errorMessage = "保存成功";
            Debug.LogFormat("onclick：{0}", ANDROID_ASSETS_DIR);
            Build();
        }

        //error message
        EditorGUILayout.LabelField(errorMessage);
    }
}
