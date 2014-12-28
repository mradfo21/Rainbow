#pragma strict

class camAimStand extends state_camera{

	function Start () {
		super.Start();
	}

	function Update () {
		super.Update();
	}

	function Enter(){
		super.Enter();

		t_orbitDistance = 1.0;
		t_orbitMinimumDistance = 1.0;
		t_bottomHeight = .2;
		t_topHeight = -.2;

		t_smoothTime = .07;
		t_vFactorIncrease = 1.0;
		t_rollAmt = .2;

		t_camFov = 40;
		t_camOffset = Vector3(.44,-.1,0);
		t_camRot = Vector3(0,0,0);
	}

	function Execute(){
		super.Execute();
	}

	function Exit(){
		super.Exit();
	}

}
