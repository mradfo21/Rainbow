#pragma strict
class scatter extends state_goal{
	var radius:float = 20.0;
	var scatterRadius:float = radius+(Random.value * 12);
	var move:ArrayList;
	var point:Vector3;

	function Start () {
		super.Start();


	}
	function Update () {
		super.Update();
	}

	function Enter():void{
		super.Enter();
		move = ConstructBaseData();
		if (poi_data.origin != Vector3.zero){
			//print("CONTACT from: "+poi_data.origin);
			var dir:Vector3 = transform.position - poi_data.origin;
			var ray:Ray = new Ray(transform.position,dir);
			point = ray.GetPoint(3.5+Random.value*5);
		}else{
			point = transform.position + (Random.insideUnitSphere * scatterRadius);			
		}

		var hit:NavMeshHit;
		if (navMesh.SamplePosition(point,hit,20,-1)){
			point = hit.position;
			var coverHit:NavMeshHit;
			if (navMesh.FindClosestEdge(point,coverHit,-1)){
				point = coverHit.position;
			}
		}else{
			point = Vector3.zero;
		}
		move[0] = "movement_move";
		move[1] = point;
		move[5] = false;

		gameObject.SendMessage("changeState",move,SendMessageOptions.DontRequireReceiver);



	}

	function Execute():void{
		super.Execute();

	}
	function Exit():void{
		super.Exit();
	}
	function DestinationReached(point:Vector3){
		finished();
	}

}