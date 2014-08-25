#pragma strict

function Start () {

}

function Update () {
	if (Input.GetButton("ToggleLook")){
		Time.timeScale = .045;
	}else{
		Time.timeScale = 1.0;
	}
}