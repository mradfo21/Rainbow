#pragma strict
class move extends state_movement{
	var distanceToCompletion = 2.2;
	var point:Vector3 = Vector3.zero;
	function Start () {
		super.Start();
		stuckTestCurrent = transform.position;
		StartCoroutine("CheckStuck");
	}

	function Update () {
		super.Update();

	}

	function Enter(){
		super.Enter();
		if (argBoolean == false){
			point = argVector;
		}else{
			point = argGameObject.transform.position;						
		}
		setNavMeshDestination(point);

	}

	function Execute(){
		super.Execute();
		setNavMeshDestination(point);	
		var distance:float = Vector3.Distance(transform.position,point);
		if (distance <= distanceToCompletion){
				ReachedDestination();								
		}
		if (stuck == true){
			ReachedDestination();
			stuck = false;
		}
		Debug.DrawLine(transform.position,point);	
	}
	function Exit(){
		super.Exit();
	}
	function CheckStuck(){
		while (true){
		if (stuckTestCurrent!= Vector3.zero){
			if (stuckCount > 10){
				if (Vector3.Distance(transform.position,stuckTestCurrent) < distanceToCompletion){
					stuck = true;
				}else{
					stuck = false;
				}
			}			
		}
		stuckTestCurrent = transform.position;
		stuckCount+=1;
		yield WaitForSeconds(2);;
		}
	}
}

