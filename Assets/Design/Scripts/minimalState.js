#pragma strict

class minimalState extends state{
	var game:GameObject;
	var gameData:gameData;
	function Start(){
		gameData = new gameData();
		gameData.Start();
	}
	function Update(){

	}

	function Enter(){
	
	}
	function Execute(){

	}
	function Exit(){
		CancelInvoke();

	}
}