#pragma strict

var canvas:Canvas;
var gameData:gameData;

function Start () {
	canvas = gameObject.GetComponent("Canvas");
	gameData = new gameData();
	gameData.Start();
}

function Update () {
	canvas.worldCamera = gameData.cameraManager.renderCamera;
}