#pragma strict
class defensivePosition extends state_goal{
	var move:ArrayList;
	var point:Vector3 = Vector3.zero;
	var hidepoint:Vector3 = Vector3.zero;
	var hidden:boolean = false;
	var timesToHide:int = 1;
	var timesHidden:int = 0;
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
		StartCoroutine("generateDestination");
	}

	function Execute():void{
		super.Execute();

	}
	function Exit():void{
		CancelInvoke();
		super.Exit();
	}

	function issueCurrentDestination(){
		move[0]="movement_move";
		move[1]=point;
		transform.parent.BroadcastMessage("changeState",move);
	}

	function isHidden(){
		var h:NavMeshHit;
		if (navMesh.Raycast(transform.position,hidepoint,h,-1)){
			hidden = false;
		}else{
			hidden = true;
		}		
	}
	function generateDestination(){
		while(true){
			if (poi_data.origin != Vector3.zero){
				hidepoint = poi_data.origin;
			}else if (attributes.target != null){
				hidepoint = attributes.target.transform.position;
			}else if (leaderAttributes.target!= null){

				hidepoint = leaderAttributes.target.transform.position;
			}else{
				hidepoint = poi_data.pos;
			}
			point = hideFromPointByLeader(hidepoint,30);
			isHidden();
			if (hidden == false){
				issueCurrentDestination();												
			}

			yield WaitForSeconds(2.0);
		}
	}



	function DestinationReached(point:Vector3){
		//if (hidden == true){
			timesHidden +=1;
			if (timesHidden > timesToHide){
				finished();				
			}
		//}
	}	


}