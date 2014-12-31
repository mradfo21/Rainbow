#pragma strict
class fireHold extends state_combat {

	function Start () {
		super.Start();
	}

	function Update () {
		super.Update();
	}

	function Enter(){
		super.Enter();
		holdfire = true;
	}

	function Execute(){
		super.Execute();
	}
	function Exit(){
		super.Exit();
	}

}