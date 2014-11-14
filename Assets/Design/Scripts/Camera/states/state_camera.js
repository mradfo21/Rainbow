#pragma strict

class state_camera extends minimalState{
	var target:Vector3 = Vector3.zero;
	var noise:CameraNoise;
	var pivoter:CameraPivoter;
	var orbit:CameraOrbit;
	var offset:CameraOffset;
	var cam:Camera;


	var speed:float = 1.0;
	var lerpTime:float = 0.0;
	var lerpClock:float = 0.0;
	var s_orbitDistance:float;
	var s_orbitMinimumDistance:float;
	var s_bottomHeight:float;
	var s_topHeight:float;
	var s_smoothTime:float;

	var s_vFactorIncrease:float;
	var s_rollSpeed:float;
	var s_rollAmt:float;
	var s_noiseAmt:float;
	var s_noiseSpeed:float;

	var s_camFov:float;
	var s_camOffset:Vector3;
	var s_camRot:Vector3;



	var t_orbitDistance:float;
	var t_orbitMinimumDistance:float;
	var t_bottomHeight:float;
	var t_topHeight:float;
	var t_smoothTime:float;

	var t_vFactorIncrease:float;
	var t_rollSpeed:float;
	var t_rollAmt:float;
	var t_noiseAmt:float;
	var t_noiseSpeed:float;

	var t_camFov:float;
	var t_camOffset:Vector3;
	var t_camRot:Vector3;


	function lerpFloat(v1:float,v2:float,speed:float):float{
		var l:float = Mathf.SmoothStep(v1,v2,lerpClock*(speed*1.3));
		return l;
	}
	function lerpVector(v1:Vector3,v2:Vector3,speed:float):Vector3{
		var l:Vector3 =  Vector3.Lerp(v1,v2,lerpClock*(speed*1.3));
		return l;
	}
	function Start () {
		super.Start();

	}

	function LateUpdate () {
		super.Update();
		lerpClock+= Time.deltaTime;
	}

	function Enter(){
		super.Enter();
		id = "camera";
		orbit = gameObject.GetComponentInChildren(CameraOrbit);
		offset =  gameObject.GetComponentInChildren(CameraOffset);
		pivoter = gameObject.GetComponentInChildren(CameraPivoter);
		noise = gameObject.GetComponentInChildren(CameraNoise);
		cam = gameObject.GetComponentInChildren(Camera);

		s_orbitDistance = orbit.distance;
		s_orbitMinimumDistance =orbit.minimumDistance;
		s_bottomHeight = orbit.bottomHeight;
		s_topHeight = orbit.topHeight;
		s_smoothTime = orbit.smoothTime;

		s_vFactorIncrease = noise.vFactorIncrease;
		s_rollSpeed = noise.rollSpeed;
		s_rollAmt = noise.rollAmt;
		s_noiseAmt = noise.noiseAmt;
		s_noiseSpeed = noise.noiseSpeed;

		s_camFov = cam.fieldOfView;
		s_camOffset = offset.offset;
		s_camRot = cam.transform.localRotation.eulerAngles;
	



		t_orbitDistance = orbit.distance;
		t_orbitMinimumDistance =orbit.minimumDistance;
		t_bottomHeight = orbit.bottomHeight;
		t_topHeight = orbit.topHeight;
		t_smoothTime = orbit.smoothTime;

		t_vFactorIncrease = noise.vFactorIncrease;
		t_rollSpeed = noise.rollSpeed;
		t_rollAmt = noise.rollAmt;
		t_noiseAmt = noise.noiseAmt;
		t_noiseSpeed = noise.noiseSpeed;

		t_camFov = cam.fieldOfView;
		t_camOffset = offset.offset;
		t_camRot = cam.transform.rotation.eulerAngles;
	

	}

	function Execute(){
		super.Execute();
		if (gameData.gameAttributes.player ){
			//attributes = gameData.gameAttributes.playerAttributes;
			target = gameData.gameAttributes.player.transform.position;			
			if (target!= Vector3.zero){
				gameObject.BroadcastMessage("CameraTarget",target);						
			}
		}
		if (debug == false){
		orbit.distance = lerpFloat(s_orbitDistance,t_orbitDistance,speed);
		orbit.minimumDistance = lerpFloat(s_orbitMinimumDistance,t_orbitMinimumDistance,speed);
		orbit.bottomHeight = lerpFloat(s_bottomHeight,t_bottomHeight,speed);
		orbit.topHeight = lerpFloat(s_topHeight,t_topHeight,speed);
		orbit.smoothTime = lerpFloat(s_smoothTime,t_smoothTime,speed);
		noise.vFactorIncrease = lerpFloat(s_vFactorIncrease,t_vFactorIncrease,speed);
		noise.noiseSpeed = lerpFloat(s_noiseSpeed,t_noiseSpeed,speed);
		noise.noiseAmt = lerpFloat(s_noiseAmt,t_noiseAmt,speed);
		noise.rollAmt = lerpFloat(s_rollAmt,t_rollAmt,speed);

		cam.fieldOfView = lerpFloat(s_camFov,t_camFov,speed);
		offset.offset = lerpVector(s_camOffset,t_camOffset,speed);
		var goalRot:Quaternion = Quaternion.Euler(t_camRot);	
		cam.transform.localRotation = Quaternion.Lerp(cam.transform.localRotation,goalRot,.1);
		}
	}

	function Exit(){
		super.Exit();
		Destroy(this);
	}


}