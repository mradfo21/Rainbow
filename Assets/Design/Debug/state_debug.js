#pragma strict

class state_debug extends minimalState{

	function Start () {
		super.Start();

	}

	function Update () {
		super.Update();
	}

	function Enter(){
		super.Enter();
		id = "debug";	}

	function Execute(){
		super.Execute();
	}

	function Exit(){
		super.Exit();
		Destroy(this);
	}
}