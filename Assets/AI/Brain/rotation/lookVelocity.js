#pragma strict

class lookVelocity extends state_rotation{

	function Start () {
		super.Start();
	}

	function Update () {
		super.Update();
	}
	function Enter(){
		super.Enter();
	}

	function Execute(){
		super.Execute();
		if (attributes.leader == true && aiming == true ){
			lookDownCamera();
		}else{
			lookAtVelocity();
		}
	}

	function Exit(){
		super.Exit();
	}
}