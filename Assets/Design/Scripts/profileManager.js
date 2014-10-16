#pragma strict

var CharacterProfileNames = new List.<String>();
var CharacterProfileObjs = new List.<GameObject>();
var CharacterProfileMap = new Dictionary.<String,GameObject>();


var TacticProfileNames = new List.<String>();
var TacticProfileObjs = new List.<GameObject>();
var TacticProfileMap = new Dictionary.<String,GameObject>();


function Start () {
	for (var i = 0; i < CharacterProfileNames.Count; i++){
		CharacterProfileMap[CharacterProfileNames[i]] = CharacterProfileObjs[i]; 
	}
	for (var j = 0; j < TacticProfileNames.Count; j++){
		TacticProfileMap[TacticProfileNames[j]] = TacticProfileObjs[j]; 
	}
}

function Update () {

}

function GetCharacterProfile(id:String):CharacterProfile{
	var profile = CharacterProfileMap[id].GetComponent("CharacterProfile");
	return profile;
}

function GetTacticProfile(id:String):TacticProfile{
	//print(" TACTIC PROFILE REQUESTED ! of : "+id);
	//print(" PROFILE: "+TacticProfileMap[id]);
	var profile = TacticProfileMap[id].GetComponent("TacticProfile");

	return profile;
}