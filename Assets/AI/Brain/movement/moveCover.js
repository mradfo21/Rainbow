class moveCover extends state_movement{
	var distanceToCompletion = 1.3;
	var coverDestination:Vector3;
	var foundCover:boolean = false;
	var finalDestination:Vector3;
	var waitTime:float = 3.0;
	var toPoint:Vector3;
	var coverTries:int = 0;

	function Start () {
		super.Start();
	}

	function Update () {
		super.Update();
	}

	function DetermineCover():Vector3{
		stuckTestCurrent = transform.position;
		toPoint = argVector;
		if (agent){
			toPoint = agent.steeringTarget;
		}
		var rayDir:Vector3 = (toPoint-transform.position).normalized;
		var coverRay:Ray = new Ray(transform.position, rayDir);
		var rayDistance = Vector3.Distance(transform.position, toPoint);
		var rayStep:float;
		rayStep = waitTime*2;

		var findCoverAround:Vector3 = Vector3.zero; 
		if (stuck == false){
			findCoverAround = coverRay.GetPoint(rayStep);			
		}
		if (findCoverAround == Vector3.zero){
			findCoverAround = argVector;
		}
		//print("determining cover");
		var hit:NavMeshHit;
		var coverPos:Vector3;
		if (navMesh.FindClosestEdge(findCoverAround,hit,-1)){
			coverPos = hit.position;
		}else{
			coverPos = Vector3.zero;
		}
		var coverDistance:float = Vector3.Distance(transform.position,coverPos);
		if (coverDistance > 5 || coverPos == Vector3.zero){
			coverDestination = coverPos;
		}else{
			finalDestination = coverPos;
			coverDestination = coverPos;
		}
		if (stuck == true){
			coverDestination = argVector;
		}
		if (Vector3.Distance(coverPos,argVector) < 4){
			finalDestination = argVector;
		}

		var correctFacing:Vector3 = (transform.position  - argVector).normalized;
		var currentFacing = (transform.position - coverDestination).normalized;
		var correctAngle:float;
		var currentAngle:float;
		correctAngle = Mathf.Cos(Vector3.Dot(transform.forward,correctFacing));
		currentAngle = Mathf.Cos(Vector3.Dot(transform.forward,currentFacing));

		var angleDifference:float = Mathf.Abs(correctAngle - currentAngle);
		if (angleDifference > .1 && coverTries > 1){
			coverDestination = argVector;
		}

		Invoke("DetermineCover",waitTime);

		coverTries+=1;

		//transform.parent.BroadcastMessage("NavmeshAgentPause",false);		
	}
	function Enter(){
		super.Enter();
		finalDestination = argVector;
		DetermineCover();
	//	print("my destination is "+coverDestination);
		setNavMeshDestination(coverDestination);

	}
	function Execute(){
		super.Execute();
		setNavMeshDestination(coverDestination);
		var distanceToGoal:float = Vector3.Distance(transform.position,argVector);
		var distanceToCover:float = Vector3.Distance(transform.position,coverDestination);

		if (distanceToGoal < distanceToCompletion){
				ReachedDestination();								
		}else{
			if (distanceToCover < distanceToCompletion){
				//transform.parent.BroadcastMessage("NavmeshAgentPause",true);
			}
		}
		Debug.DrawLine(transform.position,toPoint,Color.blue);
		Debug.DrawLine(transform.position,argVector,Color.red);
		Debug.DrawLine(transform.position,coverDestination,Color.green);
	}
	function Exit(){
		super.Exit();
	}
	function ReachedDestination(){
		//print("i reached my destination of "+coverDestination);
		transform.parent.BroadcastMessage("DestinationReached",transform.position,SendMessageOptions.DontRequireReceiver);
		transform.parent.BroadcastMessage("changeState",id+"_hold");
		finished();
	}

}