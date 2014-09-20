#pragma strict
var gameData:gameData;

function Start () {
	gameData = new gameData();
	gameData.Start();
}

function Update () {
	if (gameData.gameAttributes.player){
		var seek:Vector3 =  gameData.teams.averagePosition - transform.position;
		transform.position += seek* Time.deltaTime;		
	}

}