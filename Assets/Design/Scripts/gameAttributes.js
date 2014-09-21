#pragma strict

var teams:teams;
var playerSpecies:String = "human";
var player:GameObject;
var playerAttributes:attributes;
var playerTeam:team;
var inPlanning:boolean = false;
var inMovement:boolean = true;
var inAttack:boolean = false;
var inUAV:boolean = false;
var navmesh:NavMesh;
var timeScale:float =1.0;
var timeScaleMin:float = .025;
function Start () {
	teams = gameObject.GetComponent("teams");
}

function Update () {
	if (playerAttributes){
		playerTeam = playerAttributes.team;
	}
}

function SetPlayer(p:GameObject){
	player = p.gameObject;
	playerAttributes = player.GetComponent("attributes");
}

function SetSpecies(species:String){
	playerSpecies = species;
}