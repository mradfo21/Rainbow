#pragma strict
var gameData:gameData;

function Start () {
 	gameData = new gameData();
	gameData.Start();
}

function Update () {
		Time.timeScale = gameData.gameAttributes.timeScale;
	}