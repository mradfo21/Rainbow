#pragma strict

var animator:Animator;
private var inLook:boolean = false;
var eEnterPlanning:String = "";
var eExitPlanning:String = "";
var eIssuedOrder:String = "";
var eSwitchedTeam:String = "";
var eEnterAttack:String = "";
var eExitAttack:String = "";
var eEnterMovement:String = "";
var eExitMovement:String = "";
var eAddedTeam:String = "";
var eTargeted:String = "";
var eUnTargeted:String = "";
var eMarked:String = "";
var eUnMarked:String = "";
var eSpotted:String = "";


var beenSpotted:boolean = false;

function Start () {
	animator = gameObject.GetComponent("Animator");
}

function Update () {
}
function EnterPlanning(){
		animator.SetTrigger(eEnterPlanning);	

}
function ExitPlanning(){
		animator.SetTrigger(eExitPlanning);		
}
function EnterAttack(){
		animator.SetTrigger(eEnterAttack);		

}
function ExitAttack(){
		animator.SetTrigger(eExitAttack);		

}
function EnterMovement(){
		animator.SetTrigger(eEnterMovement);		

}
function ExitMovement(){
		animator.SetTrigger(eExitMovement);		

}
function IssuedOrder(order:String){
	animator.SetTrigger(eIssuedOrder);
}
function SwitchedTeam(t:team){
	//print("SWITCHED TEAM");
	animator.SetTrigger(eSwitchedTeam);

}
function AddedTeam(t:team){
	animator.SetTrigger(eAddedTeam);
}

function Targeted(){
	animator.SetTrigger(eTargeted);
	//print("TARGETED");
}
function UnTargeted(){
	animator.SetTrigger(eUnTargeted);
	//print("UN TARGETED");
}

function Marked(){
	animator.SetTrigger(eMarked);
	//print("MARKED");
}

function UnMarked(){
	animator.SetTrigger(eUnMarked);
	//print("UN MARKED");
}

function Spotted(){
	if (beenSpotted == false){
		animator.SetTrigger(eSpotted);
		//print("SPOTTED");
		beenSpotted = true;		
	}

}