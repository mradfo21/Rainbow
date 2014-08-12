#pragma strict
class state_goal extends state{

	var stuckTestCurrent:Vector3 = Vector3.zero;
	var stuck:boolean = false;
	var stuckCount:int = 0;
	var leaderAttributes:attributes;
	function CheckStuck(){
		while (true){
			if (stuckTestCurrent!= Vector3.zero){
				if (Vector3.Distance(transform.position,stuckTestCurrent) < 2.0){
					stuck = true;
					print("im stuck");
					stuckCount +=1;
				}else{
					stuck = false;
					stuckCount = 0;
				}			
			}
		yield WaitForSeconds(2.0);
		}
	}
	function isOccupiedByTeammate(pos:Vector3):boolean{
		for (teammate in attributes.team.members){
			var attrib:attributes = teammate.transform.parent.GetComponent("attributes");
			var d:float = Vector3.Distance(attributes.destination,attrib.destination);
			if (d < .8 && d >.001){
				return true;
			}
		}
		return false;

	}
	function isOccupiedByTeammate(pos:Vector3,radius:float):boolean{
		for (teammate in attributes.team.members){
			var attrib:attributes = teammate.transform.parent.GetComponent("attributes");
			var d:float = Vector3.Distance(attributes.destination,attrib.destination);
			if (d < radius && d >.001){
				return true;
			}
		}
		return false;

	}
	function Start () {
		super.Start();

	}

	function Update () {
		super.Update();
	}

	function Enter(){
		super.Enter();
		id = "goal";
		attributes.goal = this.GetType().ToString();
		if (attributes.team){
			leaderAttributes = attributes.team.leader.transform.parent.GetComponent("attributes");				
		}

	}
	function Execute(){
		super.Execute();
	}
	function Exit(){
		super.Exit();
	}


	function hideFromPoint(p:Vector3,radius:float){
		for (var i = 0; i < 14; i++){
			var coverHit:NavMeshHit;
			var finalPoint = transform.position;
			var randomPos = transform.position+ Random.insideUnitSphere * radius;
			var hit:NavMeshHit;
			if (navMesh.SamplePosition(randomPos,hit,2,-1)){
				var hidePoint:Vector3 = hit.position;
				if (navMesh.Raycast(p,hidePoint,hit,-1)){
					if(navMesh.FindClosestEdge(hidePoint, coverHit,-1)){
						finalPoint = coverHit.position;
					}
					if (isOccupiedByTeammate(finalPoint)==false){
						return finalPoint;
					}
				}
			}
		}
		if(navMesh.FindClosestEdge(transform.position,coverHit,-1)){
			finalPoint = coverHit.position;

		}
		return finalPoint;
	}
	function hideFromPointByLeader(p:Vector3,radius:float){
		for (var i = 0; i < 14; i++){
			var coverHit:NavMeshHit;
			var finalPoint = transform.position;
			var randomPos = transform.position+ Random.insideUnitSphere * radius;
			var hit:NavMeshHit;
			if (navMesh.SamplePosition(randomPos,hit,2,-1)){
				var hidePoint:Vector3 = hit.position;
				if (navMesh.Raycast(p,hidePoint,hit,-1)){
					if(navMesh.FindClosestEdge(hidePoint, coverHit,-1)){
						finalPoint = coverHit.position;
					}
					if (isOccupiedByTeammate(finalPoint,2)==false && Vector3.Distance(finalPoint,attributes.team.leader.transform.position) < radius){
						return finalPoint;
					}
				}
			}
		}
		if(navMesh.FindClosestEdge(transform.position,coverHit,-1)){
			if ( isOccupiedByTeammate(coverHit.position,2) == false){
				finalPoint = coverHit.position;
			}

		}
		return finalPoint;
	}
}

