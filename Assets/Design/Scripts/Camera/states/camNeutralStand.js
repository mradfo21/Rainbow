#pragma strict

class camNeutralStand extends state_camera{

	function Start () {
		super.Start();
	}

	function Update () {
		super.Update();
	}

	function Enter(){
		super.Enter();

		t_orbitDistance = 2.0;
		t_orbitMinimumDistance = 2.0;
		t_bottomHeight = -.2;
		t_topHeight = 0;
		t_smoothTime = .2;

		t_vFactorIncrease = 1.0;
		t_rollAmt = .2;

		t_camFov = 45;
		t_camOffset = Vector3(0.0,0,0);
		t_camRot = Vector3(0,0,0);


	}

	function Execute(){
		super.Execute();
	}

	function Exit(){
		super.Exit();
	}

}
