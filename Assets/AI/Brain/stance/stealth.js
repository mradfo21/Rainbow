#pragma strict

class stealth extends state_stance{
	function Awake(){
		super.Awake();
	}

	function Enter(){
		super.Enter();

	}
	function Execute(){
		super.Execute();
		stealthMovement();
		//fastMovement();

	}
	function Exit(){
		super.Exit();
	}



}