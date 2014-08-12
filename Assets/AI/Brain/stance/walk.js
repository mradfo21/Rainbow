#pragma strict

class walk extends state_stance{
	var hasFired = false;
	function Awake(){
		super.Awake();
	}

	function Enter(){
		super.Enter();

	}
	function Execute(){
		super.Execute();
		slowMovement();
	}
	function Exit(){
		super.Exit();
	}



}