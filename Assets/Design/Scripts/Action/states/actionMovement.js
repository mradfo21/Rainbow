#pragma strict

class actionMovement extends state_action{


	function Start () {
		super.Start();

	}

	function Update () {
		super.Update();
	}

	function Enter(){
		super.Enter();
		id = "Movement";
		gameObject.BroadcastMessage("EnterMovement",SendMessageOptions.DontRequireReceiver);

	}

	function Execute(){
		super.Execute();
	}

	function Exit(){
		super.Exit();
		gameObject.BroadcastMessage("ExitMovement",SendMessageOptions.DontRequireReceiver);
		Destroy(this);
	}


}