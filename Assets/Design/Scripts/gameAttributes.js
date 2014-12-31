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
var Gui:GameObject;
var GuiWS:GameObject;
var currentOrderGroup:orders;
var stances:stances;
function setup(){
	teams = gameObject.GetComponent("teams");
	actionSM = gameObject.GetComponent("stateMachine_action");
	UI = gameObject.Find("UI");
	Gui = gameObject.Find("OrderMenu").gameObject;	
	GuiWS = gameObject.Find("OrderMenuWS").gameObject;	
}
function Start () {
	Invoke("setup",1);
}

function Update () {
	if (playerAttributes){
		playerTeam = playerAttributes.team;
		playerTeamOrdersMovement = playerTeam.GetComponent("orders_movement") as orders_movement;
		playerTeamOrdersAction = playerTeam.GetComponent("orders_action") as orders_action;

	}
	currentOrderGroup = playerTeamOrdersMovement;
}
function inAction(action:String):boolean{
	if(actionSM.currentState == "action"+action){
		return true;
	}else{
		return false;
	}
}
function getCurrentAction(){
	return actionSM.currentState;
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