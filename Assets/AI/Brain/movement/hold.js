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
		attributes.agent.Stop();
		if (Random.value > .5){
			gameObject.SendMessage("changeState","stance_crouch");
		}
	}

	function Execute(){
		super.Execute();

	}
	function Exit(){
		super.Exit();
	}


}