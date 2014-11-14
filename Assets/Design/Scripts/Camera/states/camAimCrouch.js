#pragma strict

class camAimCrouch extends state_camera{

	function Start () {
		super.Start();
	}

	function Update () {
		super.Update();
	}

	function Enter(){
		super.Enter();
		t_orbitDistance = 1.1;
		t_orbitMinimumDistance = 1.1;
		t_bottomHeight = -.4;
		t_topHeight = -.65;

		t_smoothTime = .07;
		t_vFactorIncrease = 1.0;
		t_rollAmt = .2;

		t_camFov = 40;
		t_camOffset = Vector3(.6,-.1,0);
		t_camRot = Vector3(0,0,0);
		speed = 1;
	}

	function Execute(){
		super.Execute();
	}

	function Exit(){
		super.Exit();
	}

}
