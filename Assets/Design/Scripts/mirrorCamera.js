#pragma strict
var gameData:gameData;
var cam:Camera;
function Start () {
 	gameData = new gameData();
	gameData.Start();
	cam = gameObject.GetComponent(Camera);

}

function Update () {

}
