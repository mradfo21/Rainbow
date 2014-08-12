#pragma strict
class firingPosition extends state_goal{

	var point:Vector3 = Vector3.zero;
	var goal:Vector3;
	var move:ArrayList;
	function Start () {
		super.Start();


	}
	function Update () {
		super.Update();
	}

	function findGoal(){
		if (isVisible() == false){

			print("entering firing position");
			if (attributes.target){
				print("targeting TARGET");
				point = attributes.target.transform.position;
			}else if (attributes.team.enemiesDistance.Count > 0){
				print("targeting ENEMY");
				point = attributes.team.enemiesDistance[0].transform.position;
			}else if (attributes.team.poi.Count > 0){
				print("targeting POI");
				point = attributes.team.poi[0].origin;
			}
			goal = findPointVisibleToAnother(transform.position,point);
			issueCurrentDestination(goal);
		}
	}
	function Enter():void{
		super.Enter();
		move = ConstructBaseData();
		StartCoroutine("findGoal");

	}
	function issueCurrentDestination(p:Vector3){
		move[0] = ("movement_move");
		move[1] = p;
		move[5] = false;
		transform.parent.BroadcastMessage("changeState",move);
	}
	function Execute():void{
		super.Execute();
		findGoal();

	}
	function Exit():void{
		super.Exit();
	}

	function isVisible():boolean{
		var hit:NavMeshHit;
		if (navMesh.Raycast(goal,point,hit,-1) || point == Vector3.zero || goal == Vector3.zero){
			return false;
		}else{
			return true;
		}
	}
	function findPointVisibleToAnother(from:Vector3,to:Vector3):Vector3{
		for (var i = 0; i < 4; i++){
			var testPoint:Vector3;
			testPoint = (Random.insideUnitSphere*10) + from;
			var hit:NavMeshHit;
			if (navMesh.SamplePosition(testPoint,hit,30,-1)){
				testPoint= hit.position;
			}
			if (!navMesh.Raycast(testPoint,to,hit,-1)){
				return testPoint;
			}
		}
	}
	function DestinationReached(){
		finished();
	}
}