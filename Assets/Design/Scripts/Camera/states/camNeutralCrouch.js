#pragma strict

class camNeutralCrouch extends state_camera{

	function Start () {
		super.Start();
	}

	function Update () {
		super.Update();
	}

	function Enter(){
		super.Enter();
		
		t_orbitDistance = 1.7;
		t_orbitMinimumDistance = 1.7;
		t_bottomHeight = -.6;
		t_topHeight = -1;
		t_smoothTime = .2;


		t_vFactorIncrease = 3.0;
		t_rollAmt = .1;
		t_rollSpeed = 1.5;
		t_noiseAmt = .39;

		t_camFov = 50;
		t_camOffset = Vector3(1.35,0,0);
		t_camRot = Vector3(0,-20,0);
		speed = .5;

	}

	function Execute(){
		super.Execute();
	}

	function Exit(){
		super.Exit();
	}

}
