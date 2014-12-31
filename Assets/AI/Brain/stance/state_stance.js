#pragma strict
class state_stance extends state{

	var stoppingAgent:boolean = false;
	var calledStop:boolean = false;
	var gameData:gameData;
	function Awake(){
	}
	function Start () {
		super.Start();
	}

	function Update () {
		super.Update();
		if (stoppingAgent == true){
			attributes.agent.velocity /= 1.9;
			if (attributes.agent.velocity.magnitude < .1){
				if (calledStop ==false){
					agentStopped();					
				}
			}
		}
	}

	function Enter(){
		super.Enter();
		gameData = new gameData();
		gameData.Start();
		if (attributes.animator){
			id = "stance";
			Invoke("softFinish",.2);
			attributes.animator.SetFloat("alert",0.0);
			randomAnimSpeed();
			Invoke("normalAnimSpeed",.1);
		};

		//if (gameData.gameAttributes.playerAttributes == attributes){
		//	gameData.gameAttributes.stances.changeCamera(true);
		//}
	}

	function Execute(){
		super.Execute();
	}
	function Exit(){
		super.Exit();
	}

	function isPlayer():boolean{
		if (gameData.gameAttributes.playerAttributes == attributes){
			return true;
		}else{
			return false;
		}
	}
	function agentStopped(){
		calledStop = true;
		Invoke("resumeMovement",Random.Range(.65,.85));
	}
	function stopAgent(){
		calledStop = false;
		stoppingAgent = true;
		attributes.agent.velocity = Vector3.zero;
	}

	function resumeMovement(){
		stoppingAgent = false;
	}

	function randomAnimSpeed(){
		attributes.animator.speed = Random.Range(0,5);
	}
	function normalAnimSpeed(){
		attributes.animator.speed = 1;
	}

	function dampenStop(){
		print(attributes.agent.remainingDistance);
	}
}

