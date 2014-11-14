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
		gameObject.BroadcastMessage("EnterAim",SendMessageOptions.DontRequireReceiver);
		gameData.gameAttributes.playerAttributes.gameObject.BroadcastMessage("changeState","rotation_lookCamera");
	}

	function Execute(){
		super.Execute();
	}

	function Exit(){
		super.Exit();
		gameObject.BroadcastMessage("ExitAim",SendMessageOptions.DontRequireReceiver);
		gameData.gameAttributes.playerAttributes.gameObject.BroadcastMessage("changeState","rotation_lookVelocity");
		Destroy(this);
	}


}