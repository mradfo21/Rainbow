#pragma strict
var gameData:gameData;
function Start () {
	gameData = new gameData();
	gameData.Start();
}

function Update () {
	if (gameData.gameAttributes.playerTeam){
		if (gameData.gameAttributes.inUAV == false &&gameData.teams.playerTeam.leader ){
			transform.LookAt(gameData.teams.playerTeam.leader.transform.position);		
		}		
	}

}