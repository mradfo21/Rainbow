#pragma strict
var gameData:gameData;
var message:String;


var aimMessage:String;
function Start () {
 	gameData = new gameData();
	gameData.Start();
	if (gameData.gameAttributes.inAttack == true){
		gameData.gameAttributes.cameras.BroadcastMessage("changeState",aimMessage);
	}else{
		gameData.gameAttributes.cameras.BroadcastMessage("changeState",message);
	}
}

function Update () {

}