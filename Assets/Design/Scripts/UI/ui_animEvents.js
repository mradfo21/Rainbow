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

var orderMenu_Open:String = "";
var orderMenu_Close:String = "";

var eSelected:String = "";
var eDeselected:String = "";

var beenSpotted:boolean = false;

function Start () {
	animator = gameObject.GetComponent("Animator");
}

function Update () {
}
function EnterPlanning(){
	if (eEnterPlanning != ""){
		animator.SetTrigger(eEnterPlanning);
	}	

}
function ExitPlanning(){
	if (eExitPlanning != ""){
		animator.SetTrigger(eExitPlanning);
	}		
}
function EnterAttack(){
	if (eEnterAttack != ""){
		animator.SetTrigger(eEnterAttack);
	}		

}
function ExitAttack(){
	if (eExitAttack != ""){
		animator.SetTrigger(eExitAttack);
	}		

}
function EnterMovement(){
	if (eExitMovement != ""){
		animator.SetTrigger(eEnterMovement);
	}		

}
function ExitMovement(){
	if (eExitMovement != ""){
		animator.SetTrigger(eExitMovement);
	}		

}
function IssuedOrder(order:String){
	if (eIssuedOrder != ""){
		animator.SetTrigger(eIssuedOrder);
	}
}
function SwitchedTeam(t:team){
	//print("SWITCHED TEAM");
	if (eSwitchedTeam != ""){
		animator.SetTrigger(eSwitchedTeam);
	}

}
function AddedTeam(t:team){
	if (eAddedTeam != ""){
		animator.SetTrigger(eAddedTeam);
	}
}

function Targeted(){
	if (eTargeted != ""){
		animator.SetTrigger(eTargeted);
	}
	//print("TARGETED");
}
function UnTargeted(){
	if (eUnTargeted != ""){
		animator.SetTrigger(eUnTargeted);
	}
	//print("UN TARGETED");
}

function Marked(){
	if (eMarked != ""){
		animator.SetTrigger(eMarked);
	}
	//print("MARKED");
}

function UnMarked(){
	if (eUnMarked != ""){
		animator.SetTrigger(eUnMarked);
	}
	//print("UN MARKED");
}

function OrderMenuClose(){
	if (orderMenu_Close != ""){
		animator.SetTrigger(orderMenu_Close);
	}
	//print("UN MARKED");
}
function OrderMenuOpen(){
	if (orderMenu_Open != ""){
		animator.SetTrigger(orderMenu_Open);
	}
	//print("UN MARKED");
}
function Spotted(){
	if (eSpotted != ""){
		if (beenSpotted == false){
			animator.SetTrigger(eSpotted);
			//print("SPOTTED");
			beenSpotted = true;		
		}
	}

}


function Selected(){
	if (eSelected != ""){
		animator.SetTrigger(eSelected);
	}
	//print("UN MARKED");
}

function Deselected(){
	if (eDeselected != ""){
		animator.SetTrigger(eDeselected);
	}
	//print("UN MARKED");
}