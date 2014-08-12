#pragma strict

class formation extends state_stance{
	function Awake(){
		super.Awake();
	}

	function Enter(){
		super.Enter();
		StartCoroutine("scan");



	}
	function Execute(){
		super.Execute();
		if (attributes.leader == true){
			normalMovement();			
		}else{
			if (attributes.teammateTarget){
					sprint();
			}
		}
	}

	function Exit(){
		super.Exit();
	}



}