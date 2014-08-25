#pragma strict

class state_camera extends minimalState{
	var target:Vector3 = Vector3.zero;

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
		gameObject.BroadcastMessage("CameraTarget",target);			
	}

	function Exit(){
		super.Exit();
	}




}