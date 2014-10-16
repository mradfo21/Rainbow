#pragma strict

class sprint extends state_stance{
	function Awake(){
		super.Awake();
	}

	function Enter(){
		super.Enter();
		//attributes.agent.acceleration = 3.0;
		if (attributes.stance == "crouch"){
			attributes.animator.SetTrigger("crouchToStand");			
		}else if (attributes.stance == "prone"){
			attributes.animator.SetTrigger("proneToStand");			
		}
		attributes.agent.angularSpeed = 10;
		attributes.agent.speed = 6.5;
		attributes.agent.stoppingDistance = 6.0;
		attributes.stance = "sprint";

	}
	function Execute(){
		super.Execute();
	}
	function Exit(){
		super.Exit();
	}
	function agentStopped(){
		super.agentStopped();
	}



}