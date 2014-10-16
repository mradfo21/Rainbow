#pragma strict
class followFriend extends state_goal{

	var target:GameObject;
	var targetAttributes:attributes;
	var followPoint:Vector3;
	var move:ArrayList;
	var friendIndex:int = 0;
	var friendLock:boolean = false;

	var stuckpos:Vector3 = Vector3.zero;

	function Start () {
		super.Start();
	}
	function Update () {
		super.Update();
	}

	function Enter():void{
		super.Enter();
		move = ConstructBaseData();
		checkFollow();
		StartCoroutine("followThePoint");
		StartCoroutine("checkStuck"); 
 
	}

	function checkFollow(){
		testFriendly();


		if (friendLock == false){
		if (target!= null && Vector3.Distance(transform.position,target.transform.position) > 20.0){
			finished();
		}
			target = attributes.friendlies[friendIndex];
			targetAttributes = target.transform.parent.gameObject.GetComponent("attributes");
			if (attributes.follower == target || target == attributes.follower){
				friendIndex+=1;
				friendLock = false;
			}else{
				targetAttributes.follower = gameObject;
				friendLock = true;			
			}			
		}

	}
	function followThePoint(){
		while (true){
			checkFollow();
			followPoint = target.transform.parent.transform.position;
			move[0] = "movement_move";
			move[1] = followPoint;
			move[5] = false;
			gameObject.SendMessage("changeState",move,SendMessageOptions.DontRequireReceiver);
			//print("sending a follow command");
			yield WaitForSeconds(.5);
		}
	}
	function Execute():void{
		super.Execute();
	}
	function Exit():void{
		super.Exit();
	}

	function testFriendly(){
		if (attributes.leader == true){
			finished();
		}
		if (attributes.nearestFriend == null || attributes.friendlies.Count == 0){
			finished();
		}
		if (friendIndex > attributes.friendlies.Count-1){
			friendIndex =0;
		}
	}

	function DestinationReached(){

	}
}