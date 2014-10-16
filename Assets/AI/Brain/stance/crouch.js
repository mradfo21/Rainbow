#pragma strict

class crouch extends state_stance{
	function Awake(){
		super.Awake();
	}

	function Enter(){
		super.Enter();
		//attributes.agent.velocity/= 3;
		stopAgent();
		
	}
	function Execute(){
		super.Execute();
	}
	function Exit(){
		super.Exit();
	}

	function agentStopped(){
		super.agentStopped();
		if (attributes.stance == "stand" || attributes.stance == "sprint"){
			attributes.animator.SetTrigger("standToCrouch");			
		}else if (attributes.stance == "prone"){
			attributes.animator.SetTrigger("proneToCrouch");			
		}
		attributes.agent.angularSpeed = 30;
		attributes.agent.acceleration = 1;
		attributes.agent.speed = 2.5;
		attributes.agent.stoppingDistance = 0.0;
		attributes.stance = "crouch";
	}

}