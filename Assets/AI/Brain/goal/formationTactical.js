#pragma strict
class formationTactical extends state_goal{
	var move:ArrayList;
	var point:Vector3;
	var started:boolean = false;
	var hidden = false;
	var recalculate = true;
	var hidePoint:Vector3;
	var currentHidePoint:Vector3;
	var distanceThreshold:float;


	function Start () {
		super.Start();


	}
	function Update () {
		super.Update();
	}

	function Enter():void{
		super.Enter();
		distanceThreshold = 6+Random.value*4;
		move = utils.ConstructBaseData();
		StartCoroutine("renewFormation",5+Random.value*2);
		if (attributes.leader == true){
			finished();

		}else{

		}

	}

	function startFormation(){
		started = true;
		startFormation(argVector);

	}

	function hideFromDirection(direction:Vector3,point:Vector3):Vector3{

		recalculate = false;
			for (var i = 0; i < 4; i++){
				var randomPos = hidePoint+ Random.insideUnitSphere * 12;
				var hit:NavMeshHit;
				if (navMesh.SamplePosition(randomPos,hit,2,-1)){
					currentHidePoint = hit.position;
					var coverHit:NavMeshHit;
					if (navMesh.Raycast(point,hidePoint,hit,-1) && Vector3.Distance(currentHidePoint,hidePoint) > 2){
						if(navMesh.FindClosestEdge(currentHidePoint, coverHit,-1)){
							currentHidePoint = coverHit.position;
					}
						return currentHidePoint;
					}
				}
				
			}

		var cover:NavMeshHit;
		if(navMesh.FindClosestEdge(currentHidePoint,cover,-1)){
			if (isOccupiedByTeammate(cover.position,4) == false){
				return cover.position;				
			}else{
				return currentHidePoint;
			}
		}else{
			return argVector;
		}	

	}
function checkUniquePosition(){
	if (isOccupiedByTeammate(currentHidePoint) == false){

	}else{
		recalculate = true;
	}
}
function startFormation(p:Vector3){
		move[0] = attributes.team.situationalUnderstanding.getMoveType();
		move[1] = p;
		move[5] = false;
		gameObject.SendMessage("changeState",move,SendMessageOptions.DontRequireReceiver);			
}

function renewFormation(){
		while (true){
			var refresh:float;
			if (leaderAttributes){
				//refresh = 1+(leaderAttributes.agent.velocity.magnitude);
				refresh = .4;
			}else{
				refresh = .4;				
			}
			checkUniquePosition();
			if (recalculate == true){
				var leaderPosition = attributes.team.leader.transform.position;
				var leaderDirection = attributes.team.leader.transform.forward;
				move[0] = "movement_move";
				move[1] = hideFromDirection(leaderDirection,leaderPosition);
				move[5] = false;
				gameObject.SendMessage("changeState",move,SendMessageOptions.DontRequireReceiver);			
			}
			yield WaitForSeconds(refresh);
		}
	}
	function checkHideStatus(){
		var hit:NavMeshHit;
		if (Vector3.Distance(currentHidePoint,hidePoint) > distanceThreshold){
			recalculate = true;
		}
		if (navMesh.Raycast(transform.position,hidePoint,hit,-1)){
			hidden = true;
		}else{
			hidden = false;
		}

	}
	function Execute():void{
		super.Execute();
		var leaderForward:Vector3 = (leaderAttributes.destination- attributes.team.leader.transform.position).normalized;
		var r = new Ray(attributes.team.leader.transform.position,leaderForward);

		hidePoint = r.GetPoint(1+leaderAttributes.agent.velocity.magnitude);
		//hidePoint = leaderAttributes.destination;
		checkHideStatus();

		if (started == false){
			startFormation();
		}

	}

	function Exit():void{
		super.Exit();
	}

}