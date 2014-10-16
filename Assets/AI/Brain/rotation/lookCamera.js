#pragma strict

class lookCamera extends state_rotation{

	function Start () {
		super.Start();
	}

	function Update () {
		super.Update();
	}
	function Enter(){
		super.Enter();
	}

	function Execute(){
		super.Execute();
		lookDownCamera();	
	}
	function Exit(){
		super.Exit();
	}
}