#pragma strict
var gameData:gameData;
var playerTeam:team;
var nextPress:float = 0.0;
var resetTime:float = .5;
var layerMask:int;        
var poi_move:GameObject;
var planningNextPress:float = 0.0;
var planningResetTime:float = 0.001;
var clock:float = 0.0;
function Start () {
 	gameData = new gameData();
	gameData.Start();
    layerMask = 1 << 12;
    Screen.lockCursor = true;        

}


function toggleMovement(){
		gameObject.BroadcastMessage("EnterMovement");
		if (gameData.gameAttributes.inAttack == true ){
			gameObject.BroadcastMessage("ExitAttack");

		}
		planningNextPress = clock + resetTime;	
		gameData.gameAttributes.inAttack = false;
		gameData.gameAttributes.inMovement = true;
		if (gameData.gameAttributes.inPlanning == false){
			enterPlanning();
		}	
}
function toggleAttack(){
		gameObject.BroadcastMessage("EnterAttack");
		if (gameData.gameAttributes.inMovement == true ){
			gameObject.BroadcastMessage("ExitMovement");			
		}
		planningNextPress = clock + resetTime;	
		gameData.gameAttributes.inAttack = true;
		gameData.gameAttributes.inMovement = false;
		if (gameData.gameAttributes.inPlanning == false){
			enterPlanning();
		}		
}

function exitPlanning(){
	gameData.gameAttributes.inPlanning = false;
	gameData.gameAttributes.timeScale = 1.0;
	if (gameData.gameAttributes.inMovement == true){
		gameObject.BroadcastMessage("ExitMovement");
		gameData.gameAttributes.inMovement = false;

	}else if (gameData.gameAttributes.inAttack == true){
		gameObject.BroadcastMessage("ExitAttack");
		gameData.gameAttributes.inAttack = false;

	}
	gameObject.BroadcastMessage("ExitPlanning");


}
function enterPlanning(){
	gameData.gameAttributes.inPlanning = true;
	gameData.gameAttributes.timeScale = gameData.gameAttributes.timeScaleMin;
}

function Update () {
	playerTeam = gameData.gameAttributes.teams.playerTeam;
	if (Input.GetButton("IssueOrder") && clock > nextPress && gameData.gameAttributes.inMovement == true){
		nextPress = clock + resetTime;
		setupPOI(poi_move);
		gameObject.BroadcastMessage("IssuedOrder","tactic_pcMove");
		exitPlanning();
		//Invoke("exitPlanning",.01);

	}
	

	if (Input.GetAxis("TogglePlanning") && gameData.gameAttributes.inPlanning == false && clock >planningNextPress){
		planningNextPress = clock + resetTime;	
		gameObject.BroadcastMessage("EnterPlanning");
		enterPlanning();
		toggleMovement();
	}
	if (Input.GetAxis("TogglePlanning") && gameData.gameAttributes.inPlanning == true && clock >planningNextPress){
		gameObject.BroadcastMessage("ExitPlanning");	
		planningNextPress = clock + resetTime;	
		Invoke("exitPlanning",.3*gameData.gameAttributes.timeScale);

	}
	if (Input.GetAxis("ToggleAttack")&&gameData.gameAttributes.inAttack ==false && clock >planningNextPress){
		toggleAttack();
	}
	if (Input.GetAxis("ToggleMovement") &&gameData.gameAttributes.inMovement ==false && clock >planningNextPress){
		toggleMovement();
	}
	clock+=Time.unscaledDeltaTime;
}

function setupPOI(poi:GameObject){
	var pd:poi_data = new poi_data();
	var pos:Vector3 = utils.getPositionScreen().point;
	var obj:GameObject = Instantiate(poi,pos,Quaternion.identity);
	
	pd.team = playerTeam;
	pd.pos = obj.transform.position;	
	pd.origin = transform.position;	
	pd.Start();
	pd.obj = obj;
	obj.SendMessage("setup",pd);
}
