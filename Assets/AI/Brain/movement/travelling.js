#pragma strict
class travelling extends state_movement{


	function Start () {
		super.Start();
	}

	function Update () {
		super.Update();
	}

	function Enter(){
		super.Enter();
		setNavMeshDestination(point);
	}

	function Execute(){
		super.Execute();
		if (Vector3.Distance(gameObject.transform.position,point) < distanceThreshold){
			ReachedDestination();
		}

	}
	function Exit(){
		super.Exit();

	}


}