#pragma strict

var crosshair:GameObject;
var gameData:gameData;

var crosshairObj:GameObject;
function Start () {

	gameData = new gameData();
	gameData.Start();
	crosshairObj = Instantiate(crosshair);


}

function Update () {
	if (gameData.gameAttributes.player){
		crosshairObj.transform.parent = gameObject.transform;
		crosshairObj.transform.position = gameData.gameAttributes.player.gameObject.transform.position;

	}
}