#pragma strict

var tactics:tactics;
var gameData:gameData;
var profile_tactic:String;

var tacticProfile:TacticProfile;

function Start () {
	tactics = gameObject.GetComponent("tactics") as tactics;
 	gameData = new gameData();
	gameData.Start();
	Invoke("setup",.01);
	}

function setup(){
	tacticProfile= gameData.profileManager.GetTacticProfile(profile_tactic) as TacticProfile;
	tacticProfile.InjectTactics(tactics);
}
function Update () {

}