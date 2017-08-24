/************************************************************************************* 
**文 件 名：WaitAnimation 
**创建时间：2017/8/16 星期三 下午 4:41:00 
**作    者：罗弘(email： 243515320@qq.com)
**工    号：102193
**说    明： 
**版    本：V1.0.0  
**修改时间： 
**修 改 人： 
 *************************************************************************************/
using System;
using System.Collections.Generic;
using System.Net.NetworkInformation;
using UnityEngine;
using UnityEngine.UI;
using DG.Tweening;
public class WaitAnimation:MonoBehaviour
{
    public List<Texture2D> SourceImage = new List<Texture2D>();
    private const float _speed = 0.04f;
    private float _targetTime = 0;
    private bool _isDoAnimation = false;

    private int _imgIndex = 0;
    private RawImage _targetImage;


    void Awake()
    {
        _targetImage = this.transform.FindChild("targetImage").GetComponent<RawImage>();
        _targetImage.texture = SourceImage[_imgIndex];
    }

    void OnEnable()
    {
        _targetTime = Time.time + _speed;
        _isDoAnimation = true;
    }

    void OnDisable()
    {
        _isDoAnimation = false;
    }

    void Update()
    {
        if (!_isDoAnimation) return;
        if (!(Time.time > _targetTime)) return;
        
        _targetTime = Time.time + _speed;
        _imgIndex++;
        if (_imgIndex >= SourceImage.Count) _imgIndex = 0;
        _targetImage.texture = SourceImage[_imgIndex];
    }
}
