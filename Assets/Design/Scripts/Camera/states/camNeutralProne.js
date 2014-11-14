#pragma strict

class camNeutralProne extends state_camera{

	function Start () {
		super.Start();
	}

	function Update () {
		super.Update();
	}

	function Enter(){
		super.Enter();

		t_orbitDistance = 1.8;
		t_orbitMinimumDistance = 1.8;
		t_bottomHeight = -.8;
		t_topHeight = -1.7;
		t_smoothTime = .2;

		t_vFactorIncrease = 6.0;
		t_noiseAmt = .3;
		t_rollAmt = .1;
		t_rollSpeed = 1.8;
		t_camFov = 45;
		t_camOffset = Vector3(1.35,0,0);
		t_camRot = Vector3(0,-20,0);

	}

	function Execute(){
		super.Execute();
	}

	function Exit(){
		super.Exit();
	}

}
