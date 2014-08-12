#pragma strict
class hide extends state_movement{
	var distanceToCompletion = 2.8;
	var hidePoint:Vector3;
	var hideFrom:Vector3;
	var hidden:boolean = false;

	function Start () {
		super.Start();
	}

	function Update () {
		super.Update();
	}

	function Enter(){
		super.Enter();
		StartCoroutine("Hide");
	}

	function Execute(){
		super.Execute();
		testHideQuality();
		if (useGameObject == true){
			hideFrom = argGameObject.transform.position;
		}
		setNavMeshDestination(hidePoint);
		var distance:float = Vector3.Distance(transform.position,hidePoint);
		if (distance < distanceToCompletion){
				HideComplete();								
		}
		if (stuckCount > 3){
			HideComplete();
		}
	}
	function Exit(){
		super.Exit();
	}
	function HideComplete(){
		Invoke("finished",3.0);
	}

	function Hide():IEnumerator{
		while (1){
			if (hidden == false){
				hidePoint = FindHiddenPoint(argVector,20,4);
			}
			yield WaitForSeconds(3.0);
		}
	}
	function testHideQuality(){
		var hit:NavMeshHit;
		var toDirection:Vector3 = (hideFrom - hidePoint).normalized;
		var correctedLocation:Vector3 = hidePoint + toDirection;
		if (navMesh.Raycast(correctedLocation,hideFrom,hit,-1)){
			hidden = true;
		}else{
			hidden = false;
			//Debug.DrawLine(hideFrom, correctedLocation, Color.red);
		}		
	}
	function FindHiddenPoint(p:Vector3,radius:float,maxTries:int):Vector3{
		var lastTry:boolean = false;
		for(var tries = 0; tries < maxTries; tries+=1){
			
			if (tries >= maxTries-1){
				lastTry = true;
			}
			var samplePoint = Random.insideUnitSphere * radius;
			var hit:NavMeshHit;
			var rayHit:NavMeshHit;
			if (navMesh.SamplePosition(samplePoint,hit,radius/4,-1) ){
				// find a point on the navmesh
				if (navMesh.Raycast(hit.position,hideFrom,rayHit,-1)){
					// see if this point is hidden
					if (lastTry == true){
						return rayHit.position;
					}
					var coverHit:NavMeshHit;
					var coverRay:NavMeshHit;
					if (navMesh.FindClosestEdge(hit.position,coverHit,-1)){
						//find a cover point
						if (navMesh.Raycast(coverHit.position,hideFrom,coverRay,-1)){
							// find if the cover point is hidden
							return coverHit.position;
						}
					}
				}else{
					if (lastTry == true){
						//print("last try return first sampled point");
						return hit.position;
					}
				}
			}
			tries+=1;
			if(lastTry == true){
				//print("last time, returning zero");
				return Vector3.zero;
			}
		}
	}





}
