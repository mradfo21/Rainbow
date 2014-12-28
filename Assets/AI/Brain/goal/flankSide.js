#pragma strict
class flankSide extends state_goal{

	var interestPoint:Vector3;
	var interestRay:Ray;
	var interestRayLength:float;
	var flankQuarter:Vector3;
	var flankHalf:Vector3;
	var flankFull:Vector3;
	var move:ArrayList;

	var destinationCount:int = 1;
	function Start () {
		super.Start();


	}
	function Update () {
		super.Update();
	}

	function findFarthestPoint(inRay:Ray,maxDistance:float,numSamples:int):Vector3{
		var finalPoint:Vector3;
		var unit:float = 0.0;
		for (var i = 0; i < 8; i++){
			var hit:NavMeshHit;
			var unitLength:float = maxDistance/8;
			if(navMesh.SamplePosition(inRay.GetPoint(unit),hit,10,-1)){
				finalPoint = hit.position;
			}
			unit+= unitLength;
		}
		return finalPoint;
	}
	function Enter():void{
		super.Enter();
		//interestPoint = attributes.team.poi[0].origin;
		interestPoint = argVector;
		interestRay = new Ray(transform.position + (transform.forward * -3),(interestPoint-transform.position).normalized);
		interestRayLength = (interestPoint-transform.position).magnitude;
		var flankStart:float = interestRayLength/4;
		var relativePoint = transform.InverseTransformPoint(interestPoint);
		var flankDirection:Vector3;
		if (relativePoint.x > 0.0){
			flankDirection = transform.right;
		}else{
			flankDirection = transform.right * -1;
		}
		var quaterFlankRay:Ray = new Ray(interestRay.GetPoint(flankStart),flankDirection);
		flankQuarter = findFarthestPoint(quaterFlankRay,interestRayLength* 1+(Random.value),8);
		var halfFlankRay:Ray = new Ray(flankQuarter,transform.forward);
		flankHalf = findFarthestPoint(halfFlankRay,interestRayLength,4);
		var fullFlankRay:Ray = new Ray(flankHalf,(interestPoint-flankHalf).normalized);
		flankFull = findFarthestPoint(fullFlankRay,interestRayLength*.5,2);
	
		move = ConstructBaseData();

		issueCurrentDestination(flankQuarter);
	}

	function Execute():void{
		super.Execute();
		//Debug.DrawLine(transform.position,flankQuarter,Color.yellow);
		//Debug.DrawLine(flankQuarter,flankHalf,Color.red);
		//Debug.DrawLine(flankHalf,flankFull,Color.green);

	}
	function issueCurrentDestination(point:Vector3){
		move[0] = attributes.team.situationalUnderstanding.getMoveType();
		move[1] = point;
		move[5] = false;
		transform.parent.BroadcastMessage("changeState",move);
	}
	function Exit():void{
		super.Exit();
	}

	function DestinationReached(){
		destinationCount+=1;
		if (destinationCount ==2){
			issueCurrentDestination(flankHalf);
		}
		if (destinationCount == 3){
			issueCurrentDestination(flankFull);
		}
		if (destinationCount >3){
			finished();
		}
	}

}