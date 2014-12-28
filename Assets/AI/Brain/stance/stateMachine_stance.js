#pragma strict

class stateMachine_stance extends stateMachine{
	var attributes:attributes = null;

function Start(){
	super.Start();
	attributes = gameObject.transform.parent.GetComponent("attributes");

	id = "stance";

}
function Update(){
	super.Update();
}
function changeState(state:String){
	if (currentState != state){
		super.changeState(state);
	}
}
function changeState(data:ArrayList){
	if (currentState != data[0]){
		super.changeState(data);		
	}
}
function changeStateLogic(state:String){
	super.changeStateLogic(state);
}
function changeStateLogic(state:String,data:ArrayList){
	super.changeStateLogic(state,data);
}
}
