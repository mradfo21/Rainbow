#pragma strict

class minimalState extends state{
	 var gameData:gameData;
	function Start(){
	}
	function Update(){

	}

	function Enter(){
		gameData = new gameData();
		gameData.Start();
	}
	function Execute(){

	}
	function Exit(){
		CancelInvoke();

	}

	//function changeState(state:String){
	//	gameObject.SendMessage("changeState",id+"_"+state);
	//}
}