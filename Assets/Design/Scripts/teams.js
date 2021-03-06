﻿#pragma strict

var teams = new Dictionary.<String, List.<team> >();
var playerTeam:team;
var teamIndex:int = 0;
var lastPress:float = 0.0;
var gameData:gameData;
var averagePosition:Vector3 = Vector3.zero;
var initizalized:boolean = false;
function Start () {

	gameData = new gameData();
	gameData.Start();
}

function Update () {
	if (initizalized == false){
		if (SwitchTeams() == true){
			initizalized = true;
		}

	}

	if (playerTeam){
		MakePlayer();		
	}

}
function SwitchTeams():boolean{
	var t = List.<team>();
	if (teams.ContainsKey(gameData.gameAttributes.playerSpecies) == true){
		t = teams[gameData.gameAttributes.playerSpecies];
		if (teamIndex > t.Count-1){
			teamIndex = 0;
		}
		if (teamIndex < 0){
			teamIndex = t.Count-1;
		}
		playerTeam = t[teamIndex];
		//teamIndex+=1;
		gameObject.BroadcastMessage("SwitchedTeams",playerTeam,SendMessageOptions.DontRequireReceiver);

		return true;
	}else{
		return false;
	}
}

function MakePlayer(){
	gameData.gameAttributes.SetPlayer(playerTeam.leader);
}
function AddTeam(team:GameObject) {
	if (team){
	var t:team = team.GetComponent("team");
	if (!teams.ContainsKey(t.species) ){
		teams[t.species] = new List.<team>();
	}
	if (teams[t.species].Count == 0 || teams[t.species].Contains(t) == false){
		teams[t.species].Add(t);
		if (t.species == gameData.gameAttributes.playerSpecies){
			gameObject.BroadcastMessage("AddedTeam",t,SendMessageOptions.DontRequireReceiver);
		}
	}
	}
}