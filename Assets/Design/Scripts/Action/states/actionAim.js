#pragma strict

class actionAim extends state_action{


	function Start () {
		super.Start();

	}

	function Update () {
		super.Update();
	}

	function Enter(){
		super.Enter();
		id = "Aim";
		gameData.gameAttributes.playerAttributes.gameObject.BroadcastMessage("changeState","rotation_lookCamera");
		gameData.orderManager.movementIcons.deselect();

	}

	function Execute(){
		super.Execute();
	}

	function Exit(){
		super.Exit();
		gameData.gameAttributes.playerAttributes.gameObject.BroadcastMessage("changeState","rotation_lookVelocity");
		Destroy(this);
	}


}