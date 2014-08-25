#pragma strict

class followAnyone extends state_camera{

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
		target = gameData.gameAttributes.player.transform.position;
	}

	function Exit(){
		super.Exit();
	}

}
