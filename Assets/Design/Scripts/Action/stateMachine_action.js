#pragma strict
class stateMachine_action extends stateMachine{

function Start(){
	super.Start();
	id = "action";

}
function LateUpdate(){
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
}
function changeStateLogic(state:String,data:ArrayList){
	//super.changeStateLogic(state,data);
}


}