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
		if (attributes.leader == true || attributes.teammateTarget == null){
			finished();
		}
		StartCoroutine("renewFormation");


	}

	function renewFormation(){
		while(true){

		//var offset:Vector3 = -(attributes.teammateTargetAttributes.agent.velocity * offset) * 1/attributes.teammateTargetAttributes.agent.velocity.magnitude;

		point = attributes.teammateTarget.transform.position + attributes.teammateTarget.transform.forward;
		var hit:NavMeshHit;
			if (navMesh.SamplePosition(point,hit,2,-1)){
				point = hit.position;
				}
		move[0] =attributes.team.situationalUnderstanding.getMoveType();
		move[1] = point;
		move[5] = false;
		gameObject.SendMessage("changeState",move,SendMessageOptions.DontRequireReceiver);
		yield WaitForSeconds(2.0);
		}
	}
	function Execute():void{
		super.Execute();
		Debug.DrawLine(transform.position,point,Color.red);

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