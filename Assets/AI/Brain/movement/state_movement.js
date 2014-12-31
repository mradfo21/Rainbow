#pragma strict
class state_movement extends state{

	var point:Vector3;
	var stuckTestCurrent:Vector3 = Vector3.zero;
	var stuck:boolean = false;
	var stuckCount:int = 0;
	var distanceThreshold:float = 2.0;

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
		if (argBoolean == false){
			point = argVector;
		}else{
			point = argGameObject.transform.position;						
		}

		attributes.movement = this.GetType().ToString();

	}

	function Execute(){
		super.Execute();
		if (attributes.alive == false && attributes.movement != "dead"){
			gameObject.SendMessage("changeState","movement_dead");
		}
	}
	function Exit(){
		super.Exit();
		}
	function setNavMeshDestination(arg:Vector3){
		attributes.agent.SetDestination(arg);
		var stuckCount:int = 0;
	}
	function Stuck(){
		print("im stuck!!!");
	}
	function CheckStuck(){
		while (true){

			if (stuckTestCurrent!= Vector3.zero){
				if (Vector3.Distance(transform.position,stuckTestCurrent) < 2.0){
					stuck = true;
					stuckCount +=1;
				}else{
					stuck = false;
					stuckCount = 0;
				}			
			}
			if (stuckCount > 3){
				Stuck();
			}
			stuckTestCurrent = transform.position;
		yield WaitForSeconds(1);
		}
	}
	function ReachedDestination(){
		gameObject.SendMessage("DestinationReached",transform.position,SendMessageOptions.DontRequireReceiver);
		//gameObject.SendMessage("changeState","movement_hold");
		attributes.team.setBound(attributes.gameObject,attributes.boundingIndex,true);

		//finished();
	}

}

