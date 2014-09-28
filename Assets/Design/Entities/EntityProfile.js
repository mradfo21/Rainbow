#pragma strict

var attributes:attributes;
var gameData:gameData;
var profile_character:String;

var characterProfile:CharacterProfile;

function Start () {
	attributes = gameObject.GetComponent("attributes");
 	gameData = new gameData();
	gameData.Start();
	characterProfile= gameData.profileManager.GetCharacterProfile(profile_character);
	Invoke("setup",.01);
	}

function setup(){
	characterProfile.InjectAttributes(attributes);
	characterProfile.InjectCharacter(gameObject);
}
function Update () {

}