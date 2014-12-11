#pragma strict

var teams:teams;
var playerSpecies:String = "human";
var player:GameObject;
var playerAttributes:attributes;
var playerTeam:team;
var playerTeamOrdersMovement:orders_movement;
var playerTeamOrdersAction:orders_action;

var actionSM:stateMachine_action;
var inUAV:boolean = false;
var navmesh:NavMesh;
var timeScale:float =1.0;
//var timeScaleMin:float = .025;
var timeScaleMin:float = 1.0;
var UI:GameObject;
var GuiWS:GameObject;
var currentOrderGroup:orders;
function Start () {
	teams = gameObject.GetComponent("teams");
	actionSM = gameObject.GetComponent("stateMachine_action");
	UI = gameObject.Find("UI");
	GuiWS = UI.transform.Find("OrderMenuWS").gameObject;
}

function Update () {
	if (playerAttributes){
		playerTeam = playerAttributes.team;
		playerTeamOrdersMovement = playerTeam.GetComponent("orders_movement") as orders_movement;
		playerTeamOrdersAction = playerTeam.GetComponent("orders_action") as orders_action;

	}
	print("assaigning current order group to "+playerTeamOrdersMovement);
	currentOrderGroup = playerTeamOrdersMovement;
}
function inAction(action:String):boolean{
	if(actionSM.currentState == "action"+action){
		return true;
	}else{
		return false;
	}
}
function SetPlayer(p:GameObject){
	if (p){
		player = p.gameObject;
		playerAttributes = player.GetComponent("attributes");		
	}
}

function SetSpecies(species:String){
	playerSpecies = species;
}