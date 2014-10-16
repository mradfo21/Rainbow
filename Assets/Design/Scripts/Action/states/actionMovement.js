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
		gameData.gameAttributes.inMovement = true;

	}

	function Execute(){
		super.Execute();
	}

	function Exit(){
		super.Exit();
		gameObject.BroadcastMessage("ExitMovement",SendMessageOptions.DontRequireReceiver);
		gameData.gameAttributes.inMovement = false;
		Destroy(this);
	}


}