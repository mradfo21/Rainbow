#pragma strict
class coverFire extends state_goal{
var move:ArrayList;
var point:Vector3 = Vector3.zero;
var fireTime:float;
var fireClock:float = 0;
	function Start () {
		super.Start();


	}
	function Update () {
		super.Update();

	}

	function Enter():void{
		super.Enter();
		move = ConstructBaseData();
		attributes.coveringFire = true;
		print("changing role to coverFire");
		fireTime = 2+Random.value*2;

	}

	function Execute():void{
		super.Execute();
		fireClock+= Time.deltaTime;
		if (fireClock > fireTime){
			finished();
		}


	}
	function Exit():void{
		CancelInvoke();
		super.Exit();
		attributes.coveringFire = false;
	}

	function issueCurrentDestination(){
		move[0] = ("movement_move");
		move[1] = point;
		move[5] = false;
		transform.parent.BroadcastMessage("changeState",move);

	}


	function DestinationReached(point:Vector3){
	}	

}

