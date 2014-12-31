#pragma strict

class crouch extends state_stance{
	function Awake(){
		super.Awake();
	}

	function Enter(){
		super.Enter();
		if (attributes.stance != "crouch"){
		stopAgent();
			if (attributes.stance == "stand"){
				attributes.animator.SetTrigger("standToCrouch");
			}else if (attributes.stance == "prone"){
				attributes.animator.SetTrigger("proneToCrouch");			
			}
		}
		attributes.stance = "crouch";		
	}
	function Execute(){
		super.Execute();
	}
	function Exit(){
		super.Exit();
	}

	function agentStopped(){
		super.agentStopped();
		//attributes.agent.angularSpeed = 30;
		//attributes.agent.acceleration = 1;
		//attributes.agent.speed = 2.5;
		//attributes.agent.stoppingDistance = 0.0;
	}

}