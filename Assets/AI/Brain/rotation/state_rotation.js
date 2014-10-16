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

	function FixedUpdate () {
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
		aiming = gameData.gameAttributes.cameraAiming;
	}

	function Execute(){
		// remember to set attributes.readyToFire
		super.Execute();
		aiming = gameData.gameAttributes.cameraAiming;

	}
	function Exit(){
		super.Exit();
	}
	function getScanPoint():Vector3{
		var point:Vector3 = Random.insideUnitSphere * 20;
		point.y =0;
		return transform.position + point;
	}

	function lookAtTarget(){
		readyToFire = false;
		if (attributes.target){
					var lookAtPos = Vector3(attributes.target.transform.position.x,gameObject.transform.position.y,attributes.target.transform.position.z);
					var newRot = Quaternion.LookRotation(lookAtPos-transform.position);
					attributes.gameObject.transform.rotation = Quaternion.Lerp(transform.rotation,newRot,rotationSpeed* 50* Time.deltaTime);
					var toVector:Vector3 = (attributes.target.transform.parent.transform.position - attributes.gameObject.transform.position).normalized;
					var rotationFactor = Vector3.Dot(attributes.gameObject.transform.forward,toVector);
					if (rotationFactor > rotationThreshold || rotationSpeed* 50* Time.deltaTime < rotationThreshold*-1){
						readyToFire = true;
					}
				}
		}
	function lookAtTarget(point:Vector3){
		var lookAtPos = point;
		var newRot = Quaternion.LookRotation(lookAtPos-transform.position);
		attributes.gameObject.transform.rotation = Quaternion.Lerp(transform.rotation,newRot,rotationSpeed * 50*Time.deltaTime);
		}
	function lookAtTarget(point:Vector3,speed:float){
		var lookAtPos = point;
		var newRot = Quaternion.LookRotation(lookAtPos-transform.position);
		attributes.gameObject.transform.rotation = Quaternion.Lerp(transform.rotation,newRot,speed* 50*Time.deltaTime);
		}
	function lookAtVelocity(){
		if (agent.velocity.magnitude > .1){
			lookAtTarget(transform.position+agent.velocity,Random.Range(.05,.3));
		}
	}

	function lookDownCamera(){
		//attributes.gameObject.transform.rotation = Quaternion.Lerp(transform.rotation,Camera.main.gameObject.transform.rotation,50*Time.deltaTime);
		var newPos = Camera.main.gameObject.transform.forward;
		newPos+= Camera.main.gameObject.transform.right*.27;
		newPos.y = 0.0;
		lookAtTarget(newPos*100,.15);
	}
}

