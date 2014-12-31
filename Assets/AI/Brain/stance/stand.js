#pragma strict

class stand extends state_stance{
	function Awake(){
		super.Awake();
	}

	function Enter(){
		super.Enter();
		if (attributes.stance != "stand"){
		stopAgent();
			if (attributes.stance == "crouch"){
				attributes.animator.SetTrigger("crouchToStand");
			}else if (attributes.stance == "prone"){
				attributes.animator.SetTrigger("proneToStand");			
			}
		}
		attributes.stance = "stand";			

	}
	function Execute(){
		super.Execute();
	}
	function Exit(){
		super.Exit();
	}


	function agentStopped(){
		super.agentStopped();
		if (attributes.stance == "prone"){
			attributes.animator.SetTrigger("proneToStand");	
		}else if (attributes.stance == "crouch"){
			attributes.animator.SetTrigger("crouchToStand");			
		}	
		//attributes.agent.acceleration = 2.0;
		//attributes.agent.angularSpeed = 160;
		//attributes.agent.acceleration = 8;
		//attributes.agent.speed = 2.7;
		//attributes.agent.stoppingDistance = .5;
	}

}