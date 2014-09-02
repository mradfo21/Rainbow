#pragma strict

var teams:teams;
var playerSpecies:String = "human";
var player:GameObject;
var playerAttributes:attributes;
var inUAV:boolean = false;
function Start () {
	teams = gameObject.GetComponent("teams");
}

function Update () {

}

function SetPlayer(p:GameObject){
	player = p.transform.parent.gameObject;
	playerAttributes = player.GetComponent("attributes");
}

function SetSpecies(species:String){
	playerSpecies = species;
}