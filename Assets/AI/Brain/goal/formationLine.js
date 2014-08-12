#pragma strict
class formationLine extends state_goal{
	var move:ArrayList;
	var point:Vector3;
	var started:boolean = false;
	var formed:boolean = false;
	var offset:float = 1.0;
	function Start () {
		super.Start();


	}
	function Update () {
		super.Update();
	}

	function Enter():void{
		super.Enter();
		move = ConstructBaseData();
		attributes.agent.updateRotation = false;
		if (attributes.leader == true || attributes.teammateTarget == null){
			finished();
		}


	}

	function startFormation(){
		if (attributes.teammateTarget){
			var offset:Vector3 = -(attributes.team.leader.transform.parent.transform.forward * 2 * attributes.teamSpot);
			point = attributes.teammateTarget.transform.position + offset;
			var hit:NavMeshHit;
			if (navMesh.SamplePosition(point,hit,2,-1)){
				point = hit.position;
				}else{
				point = transform.position;
			}
			move[0] = "movement_move";
			move[1] = point;
			move[5] = false;
			gameObject.SendMessage("changeState",move,SendMessageOptions.DontRequireReceiver);
			started = true;
		}
	
	}
	function renewFormation(){
		var offset:Vector3 = -(attributes.teammateTargetAttributes.agent.velocity * offset) * 1/attributes.teammateTargetAttributes.agent.velocity.magnitude;
		point = attributes.teammateTarget.transform.position + offset;
		var hit:NavMeshHit;
			if (navMesh.SamplePosition(point,hit,2,-1)){
				point = hit.position;
				}else{
				point = transform.position;
			}
		move[0] = "movement_move";
		move[1] = point;
		move[5] = false;
		gameObject.SendMessage("changeState",move,SendMessageOptions.DontRequireReceiver);
	}
	function Execute():void{
		super.Execute();
		if (started == false){
			startFormation();
		}
		if (attributes.teammateTargetAttributes){
			if ( attributes.teammateTargetAttributes.agent.velocity.magnitude > .3 && formed == true){
				renewFormation();			
			}			
		}

	}

	function DestinationReached(){
		if (formed == false){
			formed = true;
		}
	}
	function Exit():void{
		super.Exit();
	}

}