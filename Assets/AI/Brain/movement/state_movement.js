#pragma strict
class state_movement extends state{


	var stuckTestCurrent:Vector3 = Vector3.zero;
	var stuck:boolean = false;
	var stuckCount:int = 0;

	function Start () {
		super.Start();
		StartCoroutine("CheckStuck");
	}

	function Update () {
		super.Update();
	}

	function Enter(){
		super.Enter();
		id = "movement";

		if (attributes.alive == true){			
			attributes.agent.Resume();
		}

	}

	function Execute(){
		super.Execute();
		if (attributes.alive== false){
			Exit();
		}
	}
	function Exit(){
		super.Exit();
		attributes.agent.Stop();
		}
	function setNavMeshDestination(arg:Vector3){
		attributes.agent.SetDestination(arg);
	}
	function CheckStuck(){
		while (true){
			if (stuckTestCurrent!= Vector3.zero){
				if (Vector3.Distance(transform.position,stuckTestCurrent) < 2.0){
					stuck = true;
					//print("im stuck");
					stuckCount +=1;
				}else{
					stuck = false;
					stuckCount = 0;
				}			
			}
		yield WaitForSeconds(2.0);
		}
	}
	function ReachedDestination(){
		gameObject.SendMessage("DestinationReached",transform.position,SendMessageOptions.DontRequireReceiver);
		gameObject.SendMessage("changeState","movement_hold");
		//finished();
	}

}

