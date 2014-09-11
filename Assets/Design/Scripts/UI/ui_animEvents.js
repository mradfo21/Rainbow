#pragma strict

var animator:Animator;
private var inLook:boolean = false;
var eEnterPlanning:String = "birth";
var eExitPlanning:String = "death";
var eIssuedOrder:String = "death";
var eSwitchedTeam:String = "birth";
var eAddedTeam:String = "";
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
function IssuedOrder(order:String){
	print("ISSUED ORDER");
	animator.SetTrigger(eIssuedOrder);
}
function SwitchedTeam(t:team){
	print("SWITCHED TEAM");
	animator.SetTrigger(eSwitchedTeam);

}
function AddedTeam(t:team){
	animator.SetTrigger(eAddedTeam);
}