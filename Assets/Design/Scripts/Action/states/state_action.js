#pragma strict

class state_action extends minimalState{

	var pstance:String;
	var stance:String;

	var cameraModifier:String;

	function Start () {
		super.Start();

	}

	function Update () {
		super.Update();
	}

	function Enter(){
		super.Enter();
		id = "Action";
	}

	function Execute(){
		super.Execute();
	}

	function Exit(){
		super.Exit();
		Destroy(this);
	}


}