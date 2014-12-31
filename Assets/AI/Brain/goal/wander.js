#pragma strict
class wander extends state_goal{
var timesWandered:float = 0;
var maxTimesWandered:float = 4+ Random.value*12;
var move:ArrayList;
var point:Vector3 = Vector3.zero;
	function Start () {
		super.Start();


	}
	function Update () {
		super.Update();
		if (debug == true){
			if (attributes.boundingIndex > 0){
				Debug.DrawLine(transform.position,point,Color.blue);

			}else{
				Debug.DrawLine(transform.position,point,Color.green);
			}
		}


	}

	function Enter():void{
		super.Enter();
		timesWandered = 0;
		maxTimesWandered = 10;

		move = ConstructBaseData();
		generateDestination();

	}

	function Execute():void{
		super.Execute();

	}
	function Exit():void{
		CancelInvoke();
		super.Exit();
	}

	function issueCurrentDestination(){
		move[0] = attributes.team.situationalUnderstanding.getMoveType();
		move[1] = point;
		move[5] = false;
		transform.parent.BroadcastMessage("changeState",move);

	}
	function generateDestination(){
		point = generatePointInRadius2D(30);			
		while (point == Vector3.zero){
			point = generatePointInRadius2D(30);			
		}
		issueCurrentDestination();
	}
	function generatePointInRadius2D(radius:float):Vector3{
		var newPosition:Vector3 = (Random.insideUnitSphere * radius);
		var hit:NavMeshHit;
		if (navMesh.SamplePosition(newPosition,hit,3,-1)){
			hit.position.y =0;
			return hit.position;
		}else{
			return Vector3.zero;
		}
	}

	function DestinationReached(point:Vector3){
		timesWandered+=1;
		//if (timesWandered < maxTimesWandered){
		Invoke("generateDestination",2.0);			
		//}else{
		//	finished();
		//}

	}	

}

