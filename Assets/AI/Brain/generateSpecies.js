#pragma strict

var friendlySpecies:String[];
var enemySpecies:String[];
function Start () {
	for (var friend in friendlySpecies){
		gameObject.BroadcastMessage("AddFriendlySpecies",friend);
	}
	for (var enemy in enemySpecies){
		gameObject.BroadcastMessage("AddEnemySpecies",enemy);
	}
}

function Update () {

}