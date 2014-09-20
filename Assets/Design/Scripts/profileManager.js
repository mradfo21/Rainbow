#pragma strict

var CharacterProfileNames = new List.<String>();
var CharacterProfileObjs = new List.<GameObject>();
var CharacterProfileMap = new Dictionary.<String,GameObject>();

function Start () {
	for (var i = 0; i < CharacterProfileNames.Count; i++){
		CharacterProfileMap[CharacterProfileNames[i]] = CharacterProfileObjs[i]; 
	}
}

function Update () {

}

function GetCharacterProfile(id:String){
	var profile = CharacterProfileMap[id].GetComponent("CharacterProfile");
	return profile;
}