#pragma strict

class tactical extends state_stance{
	var hasFired = false;
	function Awake(){
		super.Awake();
	}

	function Enter(){
		super.Enter();

	}
	function Execute(){
		super.Execute();
		tacticalMovement();
	}
	function Exit(){
		super.Exit();
	}



}