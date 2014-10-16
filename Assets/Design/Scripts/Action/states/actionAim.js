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
		gameData.gameAttributes.inAttack = true;
	}

	function Execute(){
		super.Execute();
	}

	function Exit(){
		super.Exit();
		gameData.gameAttributes.inAttack = false;
		gameObject.BroadcastMessage("ExitAim",SendMessageOptions.DontRequireReceiver);
		Destroy(this);
	}


}