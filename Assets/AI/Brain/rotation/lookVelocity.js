#pragma strict

class lookVelocity extends state_rotation{

	var lookAtVel:boolean = true;


	function Start () {
		super.Start();
	}

	function Update () {
		super.Update();
	}
	function Enter(){
		super.Enter();
		StartCoroutine("decideLookAtVel");
		

	}
	function decideLookAtVel(){
		while(true){
			if (Random.value > 0.5){
				lookAtVel = true;
			}else{
				lookAtVel = false;
			}
			yield WaitForSeconds(Random.Range(1.5,5));			
		}

	}
	function Execute(){
		super.Execute();
			
		if (lookAtVel == false){
			gameObject.SendMessage("changeState","rotation_lookTeamSector");
		}else{
			lookAtVelocity();				
		}
	}
	function Exit(){
		super.Exit();
	}
}