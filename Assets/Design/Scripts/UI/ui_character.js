#pragma strict

var attributes:attributes;
var entity:GameObject;
var brain:GameObject;
var gameData:gameData;
var currentTeam:team;
var playerAttributes:attributes;
var enemiesPermanent:List.<GameObject>;
var isEnemy:boolean = false;
function Start () {
	Invoke("Setup",.5);
	gameData = new gameData();
	gameData.Start();
}

function Setup(){



}
function Update () {
	//print(attributes);
	if (gameData.gameAttributes.playerAttributes){
		entity= gameObject.transform.parent.transform.parent.gameObject;
		brain = entity.transform.Find("Brain").gameObject; 
		attributes = entity.GetComponent("attributes");				

	
		currentTeam = gameData.gameAttributes.playerAttributes.team;
		playerAttributes = gameData.gameAttributes.playerAttributes;
		//print(brain);
		//print(gameData.gameAttributes.playerAttributes.team.enemiesPermanent.Count);
		//print(gameData.gameAttributes.playerAttributes.team.members);
		if (attributes.species == gameData.gameAttributes.playerAttributes.team.species){
			// here i notify that im an enemy and i keep track if i'm being targetted or marked or whatever, then i broadcast that
			// so i can play animation events off of it
			isEnemy = true;
			attributes.isEnemy = true;
		}

		
	}
		
	
}