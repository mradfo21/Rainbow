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
//var timeScaleMin:float = .025;
var timeScaleMin:float = 1.0;

var cameras:GameObject;
var cameraState:String;
var cameraAiming:boolean = false;
var pAim:boolean = false;
var wasJustAiming:boolean = false;
function Start () {
	teams = gameObject.GetComponent("teams");
	cameras = transform.Find("Cameras").gameObject;
	StartCoroutine("monitorAiming",.1);
}

function Update () {
	if (playerAttributes){
		playerTeam = playerAttributes.team;
	}

}

function cancelJustAiming(){
	wasJustAiming = false;
}
function monitorAiming(){
	while(1){
	if (pAim != cameraAiming && cameraAiming == false){
		wasJustAiming = true;
	}
	pAim = cameraAiming;
	yield WaitForSeconds(.05);
	cancelJustAiming();

	}
}
function SetPlayer(p:GameObject){
	player = p.gameObject;
	playerAttributes = player.GetComponent("attributes");
}

function SetSpecies(species:String){
	playerSpecies = species;
}