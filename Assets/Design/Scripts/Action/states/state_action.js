#pragma strict

class state_action extends minimalState{

	var pstance:String;
	var stance:String;

	var cameraModifier:String;

	function Start () {
		super.Start();

	}

	function Update () {
		super.Update();
	}

	function Enter(){
		super.Enter();
		id = "Action";
		StanceChanged();
	}

	function Execute(){
		super.Execute();
			if ( gameData.gameAttributes.playerAttributes){
			stance = gameData.gameAttributes.playerAttributes.stance;
			DidStanceChange();
			pstance = stance;
		}
	}

	function Exit(){
		super.Exit();
		Destroy(this);
	}
	function ChangeCamera(stance:String){
		var s:String = "cam"+ id+ stance;
		gameData.cameraManager.camHead.SendMessage("changeState","camera_"+s);
	}
	function StanceChanged(){
		if (stance == "prone"){
			ChangeCamera("Prone");
		}else if (stance == "crouch"){
			ChangeCamera("Crouch");
		}else if (stance == "stand"){
			ChangeCamera("Stand");
		}else if (stance == "sprint"){
			ChangeCamera("Sprint");
		}
	}
	function DidStanceChange(){
		if (pstance!=stance){
			StanceChanged();
		}
	}


}