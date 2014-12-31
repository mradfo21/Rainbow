#pragma strict
class hold extends state_movement{


	function Start () {
		super.Start();
	}

	function Update () {
		super.Update();
	}

	function Enter(){
		super.Enter();
		//gameObject.SendMessage("changeState","stance_crouch");

	}

	function Execute(){
		super.Execute();

	}
	function Exit(){
		super.Exit();
		//gameObject.SendMessage("changeState","stance_stand");

	}


}