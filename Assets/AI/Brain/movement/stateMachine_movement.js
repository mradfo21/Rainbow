#pragma strict
class stateMachine_movement extends stateMachine{
	var attributes:attributes = null;

function Start(){
	super.Start();
	attributes = gameObject.transform.parent.GetComponent("attributes");
	id = "movement";
	Invoke("executeDefaultState",3.0);

}
function Update(){
	super.Update();
}
function changeState(state:String){
	super.changeState(state);
}
function changeState(data:ArrayList){
	super.changeState(data);
}
function changeStateLogic(state:String){
	super.changeStateLogic(state);
	if (! attributes){
		attributes = gameObject.transform.parent.GetComponent("attributes");
	}

	attributes.movement = id+"_"+state;

}
function changeStateLogic(state:String,data:ArrayList){
	super.changeStateLogic(state,data);
	if (! attributes){
		attributes = gameObject.transform.parent.GetComponent("attributes");
	}
	attributes.movement = data[0];

}

}