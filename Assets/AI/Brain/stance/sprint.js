#pragma strict

class sprint extends state_stance{
	function Awake(){
		super.Awake();
	}

	function Enter(){
		super.Enter();

	}
	function Execute(){
		super.Execute();
		fastMovement();
	}
	function Exit(){
		super.Exit();
	}



}