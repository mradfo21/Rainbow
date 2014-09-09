#pragma strict

var attributes:attributes;
var entity:GameObject;
var brain:GameObject;
var gameData:gameData;
var currentTeam:team;
var playerAttributes:attributes;
var enemiesPermanent:List.<GameObject>;

function Start () {
	Invoke("Setup",.1);
	gameData = new gameData();
	gameData.Start();
}

function Setup(){
	entity= gameObject.transform.parent.transform.parent.gameObject;
	brain = entity.transform.Find("Brain(Clone)").gameObject; 
	attributes = entity.GetComponent("attributes");

}
function Update () {
	//print(attributes);
	currentTeam = gameData.gameAttributes.playerAttributes.team;
	playerAttributes = gameData.gameAttributes.playerAttributes;
	//print(brain);
	//print(gameData.gameAttributes.playerAttributes.team.enemiesPermanent.Count);
	//print(gameData.gameAttributes.playerAttributes.team.members);
	enemiesPermanent = gameData.gameAttributes.playerAttributes.team.enemiesPermanent;
	if (enemiesPermanent.Contains(brain)){
		gameObject.BroadcastMessage("isEnemy");
	}		
	
}