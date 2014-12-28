#pragma strict

class actionNeutral extends state_action{


	function Start () {
		super.Start();

	}

	function Update () {
		super.Update();
	}

	function Enter(){
		super.Enter();
		id = "Neutral";
		gameObject.BroadcastMessage("ExitAttack",SendMessageOptions.DontRequireReceiver);
		gameObject.BroadcastMessage("ExitMovement",SendMessageOptions.DontRequireReceiver);
		gameObject.BroadcastMessage("EnterNeutral",SendMessageOptions.DontRequireReceiver);
		gameData.orderManager.movementIcons.select();
	}

	function Execute(){
		super.Execute();
	}

	function Exit(){
		super.Exit();
		gameObject.BroadcastMessage("ExitNeutral",SendMessageOptions.DontRequireReceiver);
		Destroy(this);
	}


}