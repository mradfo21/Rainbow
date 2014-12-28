#pragma strict
class state_rotation extends state{
var rotationSpeed:float = .35;
var rotationThreshold = .05;
var readyToFire:boolean = false;
var scanPoint:Vector3 = Vector3(1.0,0.0,0.0);
var scanWaitTime:float = 3.0;
var stopped:boolean = false;
var stopTimer:float = 1+ (Random.value*2) ;
var aiming:boolean = false;
var gameData:gameData;
	function Awake(){
	}
	function Start () {
		super.Start();
		scanPoint = gameObject.transform.forward;
	}

	function Update () {
		super.Update();
	}

	function Enter(){
		gameData = new gameData();
		gameData.Start();
		super.Enter();
		agent.updateRotation = false;
		id = "rotation";
		attributes.rotation = this.GetType().ToString();
		Invoke("softFinish",.2);
	}

	function Execute(){
		// remember to set attributes.readyToFire
		super.Execute();
		transform.rotation  =attributes.gameObject.transform.rotation;
		transform.position.x = attributes.gameObject.transform.position.x;
		transform.position.z = attributes.gameObject.transform.position.z;
		transform.position.y =attributes.gameObject.transform.position.y+1.3;

	}
	function Exit(){
		super.Exit();
	}
	function getScanPoint():Vector3{
		var point:Vector3 = Random.insideUnitSphere * 20;
		point.y =0;
		return transform.position + point;
	}

	function lookAtTarget():boolean{
		readyToFire = false;
		if (attributes.vision){
			if (attributes.target){
				var lookAtPos = Vector3(attributes.target.transform.position.x,gameObject.transform.position.y,attributes.target.transform.position.z);
				var newRot = Quaternion.LookRotation(lookAtPos-transform.position);
				attributes.gameObject.transform.rotation = Quaternion.Lerp(transform.rotation,newRot,rotationSpeed* 50* Time.deltaTime);
				var toVector:Vector3 = (attributes.target.transform.parent.transform.position - attributes.gameObject.transform.position).normalized;
				var rotationFactor = Vector3.Dot(attributes.gameObject.transform.forward,toVector);
				if (rotationFactor > rotationThreshold || rotationSpeed* 50* Time.deltaTime < rotationThreshold*-1){
					readyToFire = true;
				}
				return true;
			}else if(attributes.vision.enemies.Count > 0){
				lookAtTarget(attributes.vision.enemies[0].transform.position,1);
				return true;
			}
		}else{
			return false;
		}
	}
	function lookAtTarget(point:Vector3){
		var lookAtPos = point;
		var newRot = Quaternion.LookRotation(lookAtPos-attributes.gameObject.transform.position);
		attributes.gameObject.transform.rotation = Quaternion.Slerp(attributes.gameObject.transform.rotation,newRot,rotationSpeed * 50*Time.deltaTime);
		}
	function lookAtTarget(point:Vector3,speed:float){
		var lookAtPos = point;
		var newRot = Quaternion.LookRotation(lookAtPos-attributes.gameObject.transform.position);
		attributes.gameObject.transform.rotation = Quaternion.Lerp(attributes.gameObject.transform.rotation,newRot,speed* 1*Time.deltaTime);
		}
	function lookAtVelocity(){
		agent.updateRotation = true;
		if ( attributes.target){
			agent.updateRotation = false;
			lookAtTarget();
		}else if (attributes.hint == true){
			agent.updateRotation = false;
			lookAtTarget(attributes.lastHint,.7);
		}
	//	if (agent.velocity.magnitude > .5){
	//		lookAtTarget(attributes.gameObject.transform.position+agent.velocity*100,Random.Range(.1,.3));
	//	}else{
	//		lookAtTarget(attributes.gameObject.transform.position + attributes.gameObject.transform.forward*100,Random.Range(.1,.3));
	//	}

	}

	function lookDownCamera(){
		//attributes.gameObject.transform.rotation = Quaternion.Lerp(transform.rotation,Camera.main.gameObject.transform.rotation,50*Time.deltaTime);
		var newPos = Camera.main.gameObject.transform.forward;
		newPos+= Camera.main.gameObject.transform.right*.27;
		newPos.y = 0.0;
		lookAtTarget(newPos*100,.15);
	}
}

