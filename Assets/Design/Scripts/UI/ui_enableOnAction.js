#pragma strict

var action:String;
var gameData:gameData;
var invert:boolean = false;
var canvas:Canvas;
function Start () {

	gameData = new gameData();
	gameData.Start();
	canvas = gameObject.GetComponent("Canvas");
}

function Update () {
	if (gameData.gameAttributes.inAction(action) == true){
		if (invert == false){
			canvas.enabled = true;
		}else{
			canvas.enabled = false;
		}
	}else{
		if (invert == false){
			canvas.enabled = false;
		}else{
			canvas.enabled = true;
		}

	}
}