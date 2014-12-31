#pragma strict

class lookTeamSector extends state_rotation{

	var point:Vector3;

	var initialPoint:Vector3;
	var currentPoint:Vector3;

	var angleVariance:float = 5;
	var lookAtVel:boolean = false;

	function Start () {
		super.Start();
	}

	function Update () {
		super.Update();
	}

	function Enter(){
		super.Enter();
		initialPoint = gameData.cameraManager.cam.transform.forward*1000;
		initialPoint.y = gameData.cameraManager.cam.transform.position.y;
		StartCoroutine("resetCurrentPoint");
		StartCoroutine("decideLookAtVel");
	}

	function Execute(){
		super.Execute();
		if (lookAtVel == true){
			gameObject.SendMessage("changeState","rotation_lookVelocity");
		}else{
			lookAtTarget(currentPoint,Random.Range(.8,2.3));				
		}
	}

	function Exit(){
		super.Exit();
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
	function resetCurrentPoint(){
		while (true){
			var teamAngle = attributes.teamAngle + Random.Range(1*-1,1);
			currentPoint = gameObject.transform.position + utils.polarToVectorXZ(500,teamAngle);
			yield WaitForSeconds(Random.Range(1,5));
		}

	}
}