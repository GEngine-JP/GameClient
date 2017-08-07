using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Dialog : MonoBehaviour {
	private Button settingButton;
	private Button closeButton;
	public GameObject obj;
	private Transform mRoot;

	// Use this for initialization
	void Start () {
		mRoot = transform;
		settingButton = GetComponent<Button>();
		settingButton.onClick.AddListener (OpenDialog);
		obj.SetActive (false);
	}
	
	// Update is called once per frame
	void Update () {
		
	}


	void OpenDialog(){
		obj.SetActive (!obj.active);
	}

	void CloseDialog(){
		obj.SetActive (false);
	}
}
