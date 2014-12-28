#pragma strict

var movementTypes = new List.<String>();
var currentMoveType:String;
//var friendlies:int;
var enemies:int;
var cover:int;

var team:team;
function Start () {
	currentMoveType = movementTypes[0];
	team = gameObject.GetComponent("team");
}

function Update () {
	//friendlies = attributes.vision.Count;
}

function getMoveType():String{

	return ("movement_"+currentMoveType);
}