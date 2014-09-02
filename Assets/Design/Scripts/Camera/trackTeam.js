#pragma strict
var gameData:gameData;

function Start () {
	gameData = new gameData();
	gameData.Start();
}

function Update () {
	var seek:Vector3 =  gameData.teams.averagePosition - transform.position;
	transform.position += seek* Time.deltaTime;
}