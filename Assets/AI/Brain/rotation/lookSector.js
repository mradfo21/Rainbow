#pragma strict

class lookSector extends state_rotation{

	var initialPoint:Vector3;
	var currentPoint:Vector3;

	var angleVariance:float = 5;
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
		Invoke("revertToVelocity",Random.Range(5,8));
	}

	function revertToVelocity(){
		gameObject.SendMessage("changeState","rotation_lookVelocity");

	}
	function Execute(){
		super.Execute();
		if (attributes.target){
			lookAtTarget();
		}else{
			lookAtTarget(initialPoint,Random.Range(2,4));
		}
	}
	function Exit(){
		super.Exit();
	}
}