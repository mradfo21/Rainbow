#pragma strict
var gameData:gameData;
function Start () {
	gameData = new gameData();
	gameData.Start();
}

function Update () {
	if (gameData.gameAttributes.inUAV == false){
		transform.LookAt(gameData.teams.playerTeam.leader.transform.position);		
	}
}