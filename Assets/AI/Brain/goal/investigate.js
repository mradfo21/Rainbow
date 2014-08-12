#pragma strict
class investigate extends state_goal{
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

	function issueCurrentDestination():IEnumerator{
			move[0]="movement_move";
			move[1]=point;
			transform.parent.BroadcastMessage("changeState",move);
			
	}
	function generateDestination(){
			point = generatePointInRadius2D(2);			
			while (point == Vector3.zero){
				point = generatePointInRadius2D(2);			
			}
			issueCurrentDestination();
	}
	function generatePointInRadius2D(radius:float):Vector3{
		var hit:NavMeshHit;
		var location:Vector3 = argVector;
		if (useGameObject == true){
			location = argGameObject.transform.position;
		}
		if (navMesh.SamplePosition(location,hit,2,-1)){
			return hit.position;
		}else{
			return Vector3.zero;
		}
	}

	function investigationComplete(){
		//print("investigation complete");
		transform.parent.BroadcastMessage("changeState","goal_default");
		finished();
	}

	function DestinationReached(){
		//print("target has reached investiagtion point");
		transform.parent.BroadcastMessage("changeState","movement_hold");
		 Invoke("investigationComplete",8);
	}	


}