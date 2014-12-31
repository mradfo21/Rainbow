#pragma strict
import System.Linq;

class bounding extends state_movement{

	var path:NavMeshPath;
	var totalDistance:float = 0.0;
	var boundIndex:int= 0;
	var boundTarget:Vector3;
	var distanceThresh:float = 1.0;
	var holding:boolean = true;
	var mesh:NavMesh;
	var monitorBoundIndex:int = 0;
	var holdingTime:float = 0.0;
	function Start () {
		super.Start();
	}

	function Update () {
		super.Update();
	}

	function Enter(){
		super.Enter();
		path = new NavMeshPath();
		attributes.agent.CalculatePath(point,path);
		totalDistance = findPathDistance(path);
		Invoke("initialBoundTest",1);
		hold();
	}
	function Execute(){
		super.Execute();
		monitorBoundIndex = attributes.boundingIndex+1;
		if (monitorBoundIndex >= attributes.team.boundingGroup.Count){
			monitorBoundIndex = 0;
		}
		if (holding == false){
			if (Vector3.Distance(gameObject.transform.position,boundTarget) < distanceThresh){
				hold();
			}
		}
		var num:int = attributes.team.boundingGroup[attributes.boundingIndex].Count;
		print(attributes.boundingIndex + " monitoring  "+ monitorBoundIndex + "and status is : "+attributes.team.getBoundBool(monitorBoundIndex)+" with " +num +" number of units");
		monitorHold();
		if (holding == true){
			holdingTime += Time.deltaTime;
		}else{
			holdingTime = 0.0;
		}

	}
	function Exit(){
		super.Exit();
	}
	function initialBoundTest(){
		stuckCount = 0;
		if (attributes.boundingIndex == 1){
			moveOut();
		}else{
			holding = true;
			attributes.team.setBound(attributes.gameObject,attributes.boundingIndex,true);
			//moveOutInitial();
		}		
	}
	function monitorHold(){
		//print(attributes.boundingIndex +" holding time is "+holdingTime);
		if (attributes.team.getBound(attributes.gameObject,attributes.boundingIndex) == true){
			Debug.DrawLine(gameObject.transform.position,gameObject.transform.position+ (gameObject.transform.forward *.3),Color.red);
		}

		if (attributes.team.getBoundBool(monitorBoundIndex) == true && attributes.team.getBoundBool(attributes.boundingIndex) == true && holdingTime > 5.0){
			moveOut();
		}		
	}
	function hold(){
		if (holding == false){
			// execute once
			holding = true;
			attributes.agent.Stop();
			gameObject.SendMessage("changeState","stance_crouch");
		}
		attributes.team.setBound(attributes.gameObject,attributes.boundingIndex,true);

	}

	function moveOutInitial(){
		stuckCount = 0;
		gameObject.SendMessage("changeState","rotation_lookVelocity");
		gameObject.SendMessage("changeState","stance_stand");
		attributes.agent.Resume();
		holding = false;
		setInitialBoundPoint();
		setNavMeshDestination(boundTarget);
		attributes.team.setBound(attributes.gameObject,attributes.boundingIndex,false);

	}
	function moveOutGlobal(){
		stuckCount = 0;
		print("MOVE OUT Global");
		gameObject.SendMessage("changeState","rotation_lookVelocity");
		gameObject.SendMessage("changeState","stance_stand");
		attributes.agent.Resume();
		holding = false;
		setNewBoundPoint();
		setNavMeshDestination(boundTarget);
		attributes.team.setBound(attributes.gameObject,attributes.boundingIndex,false);
		if(Vector3.Distance(gameObject.transform.position,point) < distanceThresh){
			ReachedDestination();
		}

	}
	function moveOut(){
		stuckCount = 0;
		if (holding == true){
			print("MOVE OUT CALLED");
			// execute once
			gameObject.SendMessage("changeState","rotation_lookVelocity");
			gameObject.SendMessage("changeState","stance_stand");
			attributes.team.moveOutIndex(attributes.gameObject,attributes.boundingIndex);
			attributes.agent.Resume();
			holding = false;
			setNewBoundPoint();
			setNavMeshDestination(boundTarget);
			attributes.team.setBound(attributes.gameObject,attributes.boundingIndex,false);

		}
	}
	function setInitialBoundPoint(){
		boundTarget = path.corners[0];		
	}
	function setNewBoundPoint(){
		if (boundIndex+1 <= path.corners.Length-1){
			boundIndex +=1;
			boundTarget = path.corners[boundIndex];

			if (Vector3.Distance(transform.position, boundTarget) < 5){
				// make this recursive at some point
				if (boundIndex+1 <= path.corners.Length-1){
					boundTarget = path.corners[boundIndex];
				}else{
					boundTarget = point;
				}
			}
		}else{
			boundTarget = point;
		}
	}
	function findPathDistance(p:NavMeshPath):float{
		if (p.corners.Length  > 2){
			var d:float = 0.0;
			for (var i = 0; i < p.corners.Length-2; i++){
				d += Vector3.Distance(p.corners[i],p.corners[i+1]);
			} 
			return d;
		}else{
			return Vector3.Distance(path.corners[0],path.corners[1]);
		}
	}

	function Stuck(){
		super.Stuck();
		if (holding == false && attributes.team.getBoundBool(monitorBoundIndex) == true){
			hold();
		}
	}

}