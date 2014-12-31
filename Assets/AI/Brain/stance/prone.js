#pragma strict

class prone extends state_stance{
	function Awake(){
		super.Awake();
	}

	function Enter(){
		super.Enter();
		if (attributes.stance != "prone"){
		stopAgent();
			if (attributes.stance == "stand"){
				attributes.animator.SetTrigger("standToProne");
			}else if (attributes.stance == "crouch"){
				attributes.animator.SetTrigger("crouchToProne");			
			}
		}
		attributes.stance = "prone";			


	}
	function Execute(){
		super.Execute();
	}
	function Exit(){
		super.Exit();
	}

	function agentStopped(){
		super.agentStopped();
		if (attributes.stance == "stand"){
			attributes.animator.SetTrigger("standToProne");			
		}else if (attributes.stance == "crouch"){
			attributes.animator.SetTrigger("crouchToProne");			
		}		
		//attributes.agent.acceleration = 1;
		//attributes.agent.angularSpeed = 5;
		//attributes.agent.acceleration = 1;
		//attributes.agent.speed = 1;
		//attributes.agent.stoppingDistance = 0.0;
	}

}