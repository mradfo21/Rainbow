#pragma strict
class state_stance extends state{
var distanceThreshold:float = 500.0;
var rotationSpeed:float = .35;
var rotationThreshold = .05;
var readyToFire:boolean = false;
var scanPoint:Vector3 = Vector3.zero;
var scanWaitTime:float = 3.0;
var stopped:boolean = false;
var stopTimer:float = 1+ (Random.value*2) ;

	function Awake(){
	}
	function Start () {
		super.Start();
	}

	function Update () {
		super.Update();
	}

	function Enter(){
		super.Enter();
		id = "stance";
		attributes.stance = this.GetType().ToString();
		Invoke("softFinish",.2);
		scan();
	}

	function Execute(){
		super.Execute();
		if (attributes.alive == false){
			Exit();
		}
		scanWaitTime-= Time.deltaTime;
		if (attributes.target !=null){
			lookAtTarget();
			if (readyToFire == true){
				attributes.readyToFire = true;
				//fireWeapon();
			}			
		}else if (attributes.coveringFire == true){
			lookAtTarget(attributes.coverTarget,.01+Random.value *.05);
		}else if (attributes.contact == true){
			lookAtTarget(attributes.lastContact,.01+Random.value *.05);
		}else if (attributes.hint == true){
			lookAtTarget(attributes.lastHint,.03+Random.value *.1);
		}else{
			lookAtTarget(scanPoint,.01+Random.value *.05);				
		}
	}
	function Exit(){
		super.Exit();
	}
	function getScanPoint():Vector3{
		var point:Vector3 = Random.insideUnitSphere * 20;
		point.y =0;
		return transform.position + point;
	}

	function scan(){
			if (attributes.agent.velocity.magnitude > .5){
				scanPoint = getScanPoint();
			}
			Invoke("scan",2+Random.value*3);
	}
	function lookAtTarget(){
		readyToFire = false;
		if (attributes.target){
					var lookAtPos = Vector3(attributes.target.transform.position.x,gameObject.transform.position.y,attributes.target.transform.position.z);
					var newRot = Quaternion.LookRotation(lookAtPos-transform.position);
					attributes.gameObject.transform.rotation = Quaternion.Lerp(transform.rotation,newRot,rotationSpeed);
					var toVector:Vector3 = (attributes.target.transform.parent.transform.position - attributes.gameObject.transform.position).normalized;
					var rotationFactor = Vector3.Dot(attributes.gameObject.transform.forward,toVector);
					if (rotationFactor > rotationThreshold || rotationSpeed < rotationThreshold*-1){
						readyToFire = true;
					}
				}
		}
	function lookAtTarget(point:Vector3){
		var lookAtPos = point;
		var newRot = Quaternion.LookRotation(lookAtPos-transform.position);
		attributes.gameObject.transform.rotation = Quaternion.Lerp(transform.rotation,newRot,rotationSpeed);
		}
	function lookAtTarget(point:Vector3,speed:float){
		var lookAtPos = point;
		var newRot = Quaternion.LookRotation(lookAtPos-transform.position);
		attributes.gameObject.transform.rotation = Quaternion.Lerp(transform.rotation,newRot,speed);
		}


	function pauseRun(){
		Invoke("resumeRun",(1+Random.value*2) );
		normalMovement();

	}
	function resumeRun(){
			stopped = false;
			stopTimer = 1+ (Random.value*1.5) ;
			briskMovement();
	}


	function pauseMovement(){
			gameObject.SendMessage("changeState","movement_hold");
			Invoke("resumeMovement",(3+Random.value*4) );
	}
	function resumeMovement(){
			stopped = false;
			stopTimer = 1+ (Random.value*3.5) ;
		if (attributes.movement == "movement_hold"){
			gameObject.SendMessage("changeState","movement_previous");
		}
	}

	function slowMovement(){
		attributes.walk();
	}
	function fastMovement(){
		attributes.sprint();
	}
	function normalMovement(){
		attributes.jog();
	}
	function briskMovement(){
		attributes.run();
	}
	function tacticalMovement(){
		stopTimer -= Time.deltaTime;
		if (stopTimer < 0 && stopped == false){
			pauseRun();
			stopped = true;		
		}
	}
	function stealthMovement(){
		normalMovement();
		print(attributes.movement);
		stopTimer -= Time.deltaTime;
		if (stopTimer < 0 && stopped == false){
			pauseMovement();
			stopped = true;

		}

	}


}

