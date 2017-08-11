package com.worthgod.demo;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.widget.Toolbar;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Toast;

import com.tencent.stat.StatConfig;
import com.tencent.stat.StatService;
import com.unity3d.player.*;
/**
 * Created by Administrator on 2017/8/11 0011.
 */

public class MainActivity extends UnityPlayerActivity
{
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_auto_face_and_xlua, menu);
        return true;
    }


    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }


    //显示提示
    public void ShowToast(final String mes)
    {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Toast.makeText(MainActivity.this, mes, Toast.LENGTH_SHORT).show();
            }
        });
    }

    ///notify unity
    public void SendUnityCallBack(String objectName, String methodName, String paramJson)
    {
        if(paramJson == null)
        {
            paramJson = "";
        }
        UnityPlayer.UnitySendMessage(objectName, methodName, paramJson);
    }

    //unity测试按钮1
    public int add(int a,int b){
        return a+b;
    }
    //测试按钮3
    public void CallUnity(String objectName, String methodName){
        SendUnityCallBack( objectName,  methodName,null);
    }
}
