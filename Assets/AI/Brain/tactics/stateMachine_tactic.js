#pragma strict
class stateMachine_tactic extends stateMachine{
	var tactics:tactics;
	var data:ArrayList;
	var currentTactic:tactic;
	var previousTactic:tactic;
	var previousTacticObj:GameObject;
function Start(){
	super.Start();
	tactics = gameObject.GetComponent("tactics");
	id = "tactic";
	data = utils.ConstructBaseData();
	Invoke("executeDefaultState",4.0);

}
function Update(){
	super.Update();
	if (!tactics){
		tactics = gameObject.GetComponent("tactics");
	}
}
function changeState(state:String){
	super.changeState(state);
	//data[0] = state;
	//changeState(data);

}
function changeState(data:ArrayList){
	super.changeState(data);

}
function changeState(args:stateArgs){
	super.changeState(args.decode());

}
function changeStateLogic(state:String){
	super.changeStateLogic(state);

}
function changeStateLogic(state:String,data:ArrayList){
	// this pulls the tactics object from a pre-cached list of tactics... its efficient
	print("chaning tactic to "+state);
	//if (state){
		if (!tactics){
			tactics = gameObject.GetComponent("tactics");
		}
		previousTactic = currentTactic;
		Destroy(previousTacticObj);
		var obj:GameObject = Instantiate(tactics.GetTactic(state));
		obj.transform.parent = gameObject.transform;
		previousTacticObj = obj;
		var tactic:tactic = obj.GetComponent("tactic");
		tactic.data = data;
		currentTactic = tactic;
	//}

	}
}