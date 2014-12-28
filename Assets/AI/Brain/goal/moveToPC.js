#pragma strict
class moveToPC extends state_goal{
	var move:ArrayList;
	var point:Vector3 = Vector3.zero;

	function Start () {
		super.Start();
	}
	function Update () {
		super.Update();
		//if (debug == true){
		Debug.DrawLine(transform.position,point,Color.green);
		//}
	}
	function Enter():void{
		super.Enter();
		point = orderData.movement_positions[attributes.teamSpot];
		move = ConstructBaseData();
		issueCurrentDestination();
	}

	function Execute():void{
		super.Execute();

	}
	function Exit():void{
		CancelInvoke();
		super.Exit();
	}

	function issueCurrentDestination():IEnumerator{
			move[0]=attributes.team.situationalUnderstanding.getMoveType();
			move[1]=point;
			transform.parent.BroadcastMessage("changeState",move);
			
	}
	function generateDestination(){
			point = generatePointInRadius2D();			
			while (point == Vector3.zero){
				point = generatePointInRadius2D();
			}
			issueCurrentDestination();
	}
	function generatePointInRadius2D():Vector3{
		var hit:NavMeshHit;
		var location:Vector3 = argVector;
		if (useGameObject == true){
			location = argGameObject.transform.position;
		}
		if (navMesh.SamplePosition(location,hit,.5,-1)){
			if(isOccupiedByTeammate(hit.position,1) == true){
				return Vector3.zero;
			}else{
				return hit.position;				
			}
		}else{
			return Vector3.zero;
		}
	}

	function DestinationReached(){
		print("target has reached moveTo point");
		transform.parent.BroadcastMessage("changeState","movement_hold");
		finished();
	}	


}