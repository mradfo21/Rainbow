#pragma strict

var teams = new Dictionary.<String, List.<team> >();
var playerTeam:team;
var teamIndex:int = 0;
var lastPress:float = 0.0;
var gameData:gameData;
var averagePosition:Vector3 = Vector3.zero;
function Start () {
	gameData = new gameData();
	gameData.Start();
}

function Update () {
	if ( playerTeam.leader){
		MakePlayer();
	}
	if (Input.GetAxisRaw("SwitchTeams") && Time.time > lastPress+.5){
		lastPress = Time.time;
		teamIndex +=Input.GetAxisRaw("SwitchTeams");
		SwitchTeams();
	}
	averagePosition = GetAveragePosition();

}
function GetAveragePosition():Vector3{
	var pos:Vector3 = Vector3.zero;
	if (teams.ContainsKey(gameData.gameAttributes.playerSpecies) == true){
		for (t in teams[gameData.gameAttributes.playerSpecies]){
			pos+=t.averagePosition;
		}
	}
	return pos/ (teams[gameData.gameAttributes.playerSpecies].Count);
}
function SwitchTeams(){
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
	}else{
		print("this species doesn't exist");
	}
}

function MakePlayer(){
	gameObject.BroadcastMessage("SetPlayer",playerTeam.leader);
}
function AddTeam(team:GameObject) {
	var t:team = team.GetComponent("team");
	if (!teams.ContainsKey(t.species) ){
		teams[t.species] = new List.<team>();
	}
	if (teams[t.species].Contains(t) == false ){
		teams[t.species].Add(t);
	}
	playerTeam = t;
	//Invoke("MakePlayer",5.0);
}