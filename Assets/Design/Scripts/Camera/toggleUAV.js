#pragma strict

var lastTime:float = 0.0;
var cam:Camera;
var gameData:gameData;

function Start () {
	cam = gameObject.GetComponent("Camera");
	gameData = new gameData();
	gameData.Start();
}

function Update () {
	if (Input.GetButton("ToggleUAV") && Time.time > lastTime + .5){
		if (cam.enabled == true){
			cam.enabled = false;
			gameData.gameAttributes.inUAV = false;
		}else{
			cam.enabled = true;
			gameData.gameAttributes.inUAV = true;

		}
		lastTime = Time.time;
	}

}