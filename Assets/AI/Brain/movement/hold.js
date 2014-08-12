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
	}

	function Execute(){
		super.Execute();

	}
	function Exit(){
		super.Exit();
	}


}