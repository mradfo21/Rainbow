#pragma strict

class lookVelocity extends state_rotation{


	var initialPoint:Vector3;
	var currentPoint:Vector3;

	var angleVariance:float = 5;
	var lookAtVel:boolean = true;
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
	function Execute(){
		super.Execute();
		if (lookAtTarget() == true){
			
		}else{
			if (lookAtVel == true){
				lookAtVelocity();
			}else{
				lookAtTarget(currentPoint,Random.Range(.8,2.3));				
			}
		}
	}
	function Exit(){
		super.Exit();
	}
}