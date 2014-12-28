#pragma strict
class flee extends state_goal{
	var move:ArrayList;
	var point:Vector3 = Vector3.zero;
	function Start () {
		super.Start();
	}
	function Update () {
		super.Update();
		if (debug == true){
			Debug.DrawLine(transform.position,point,Color.green);
		}
	}
	function Enter():void{
		super.Enter();
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
		move[0]=attributes.team.situationalUnderstanding.getMoveType();
		move[1]=point;
		transform.parent.BroadcastMessage("changeState",move);
	}
	function generateDestination(){
		// find a point from the argVector and you
		var fleeVector:Vector3 = (transform.position- argVector).normalized;

		point = generatePointInRadius2D(2,transform.position + fleeVector * 8);
		var count:int = 0;			
		while (point == Vector3.zero && count <4){
			point = generatePointInRadius2D(2,transform.position + fleeVector * 8);
			count +=1;			
		}

		issueCurrentDestination();
	}
	function generatePointInRadius2D(radius:float,location:Vector3):Vector3{
		var hit:NavMeshHit;
		if (navMesh.SamplePosition(location,hit,2,-1)){
			return hit.position;
		}else{
			return Vector3.zero;
		}
	}

	function ResumeActivity(){
		transform.parent.BroadcastMessage("changeState","goal_default");		
	}
	function CoverReached(){
		//print("investigation complete");
		transform.parent.BroadcastMessage("changeState","move_hold");
		Invoke("ResumeActivity",5);
	}

	function DestinationReached(point:Vector3){
		// once they've fled, issue a "find cover" order
		move[0] = "movement_findCover";
		move[1] = argVector;
		transform.parent.BroadcastMessage("changeState",move);
		finished();
	}	


}