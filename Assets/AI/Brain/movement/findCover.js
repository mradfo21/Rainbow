#pragma strict
class findCover extends state_movement{
	var distanceToCompletion = 1.5;
	var point:Vector3;
	var distanceToFlee:float = 12.0;
	function Start () {
		super.Start();
	}

	function Update () {
		super.Update();
		if (stuck == true){
			ReachedDestination();
			stuck = false;
		}
		stuckTestCurrent = transform.position;
	}

	function DetermineCover(){

		var coverFrom:Vector3 = argVector;
		if (useGameObject == true){
			coverFrom = argGameObject.transform.position;
		}
		var coverPoint:Vector3 = transform.position + transform.forward;
		if (argVector != Vector3.zero){
			var fleeVector:Vector3 = (transform.position - coverFrom).normalized;
			if (Vector3.Distance(transform.position,coverFrom) < distanceToFlee){
				coverPoint += (fleeVector*12);				
			}else{
				coverPoint = transform.position;
			}
		}
		var hit:NavMeshHit;
		if (navMesh.FindClosestEdge(coverPoint,hit,-1)){
			point = hit.position;
		}else{
			point = transform.position;
		}
		if (useGameObject == true){
			Invoke("DetermineCover",1);
		}
	}
	function Enter(){
		super.Enter();
		DetermineCover();
		setNavMeshDestination(point);


	}

	function Execute(){
		super.Execute();
		setNavMeshDestination(point);
		var distance:float = Vector3.Distance(transform.position,point);
		if (distance < distanceToCompletion){
				Invoke("ReachedDestination",8);								
		}
	}
	function Exit(){
		super.Exit();
	}

}