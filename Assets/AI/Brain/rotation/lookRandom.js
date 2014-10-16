#pragma strict

class lookRandom extends state_rotation{

	var point:Vector3;

	function Start () {
		super.Start();
	}

	function Update () {
		super.Update();
	}

	function SwitchScanPoints(){
		transform.parent.BroadcastMessage("changeState","rotation_lookRandom");
	}
	function Enter(){
		super.Enter();
		point = getScanPoint();
		Invoke("SwitchScanPoints",Random.Range(1,7));
	}

	function Execute(){
		super.Execute();
		lookAtTarget(point,Random.Range(.03,.1));
		lookAtTarget(point,1);

	}

	function Exit(){
		super.Exit();
	}
}