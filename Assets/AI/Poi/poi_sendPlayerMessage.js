#pragma strict
var gameData:gameData;
var message:String;
var sendIfAiming:boolean = false;
function Start () {
	gameData = new gameData();
	gameData.Start();
	if (sendIfAiming == true){
		gameData.gameAttributes.player.BroadcastMessage("changeState",message);
	}

}

function Update () {
}