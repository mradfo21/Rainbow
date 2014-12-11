#pragma strict

class debug1 extends state_debug{

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