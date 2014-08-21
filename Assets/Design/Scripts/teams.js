#pragma strict

var teams = new Dictionary.<String, List.<team> >();
var playerTeam:team;

function Start () {

}

function Update () {
	if ( playerTeam.leader){
		MakePlayer();
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
	Invoke("MakePlayer",5.0);
}