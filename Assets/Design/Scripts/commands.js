#pragma strict
var gameData:gameData;
var playerTeam:team;
var nextPress:float = 0.0;
var resetTime:float = .5;
var layerMask:int;        
var poi_move:GameObject;

var poi_stance_prone:GameObject;
var poi_stance_crouch:GameObject;
var poi_stance_run:GameObject;
var poi_stance_sprint:GameObject;

var stanceIndex:int = 1;

var stanceMap = new Dictionary.<int,GameObject>();
var planningNextPress:float = 0.0;
var planningResetTime:float = 0.05;

var stanceNextPress:float = 0.0;
var stanceResetTime:float = 0.001;

var clock:float = 0.0;
function Start () {
 	gameData = new gameData();
	gameData.Start();
    layerMask = 1 << 12;
    Screen.lockCursor = true;

    stanceMap[1] = poi_stance_prone;        
    stanceMap[2] = poi_stance_crouch;        
    stanceMap[3] = poi_stance_run;        
    stanceMap[4] = poi_stance_sprint;
    Invoke("ToggleStance",2);        
}

function changeAction(state:String){
	gameObject.SendMessage("changeState","action_"+state,SendMessageOptions.DontRequireReceiver);
}
function ToggleStance(){
		stanceNextPress = clock + stanceResetTime;	
		gameData.gameAttributes.playerTeam.stanceIndex += Input.GetAxisRaw("ToggleStance");
		if (stanceIndex > 4){
			stanceIndex=4;
		}
		if (stanceIndex < 1){
			stanceIndex = 1;
		}
		setupPOI_Stance(stanceMap[gameData.gameAttributes.playerTeam.stanceIndex]);
		
}

function toggleMovement(){
		if (gameData.gameAttributes.inMovement== false ){
			if (gameData.gameAttributes.inAttack == true || gameData.gameAttributes.cameraAiming == true ){
				setupPOI_Stance(stanceMap[stanceIndex]);
			}
			gameData.gameAttributes.inMovement = true;
			gameObject.BroadcastMessage("EnterMovement");

		}else{
			gameData.gameAttributes.inMovement = false;
			gameObject.BroadcastMessage("ExitMovement");
		}
		planningNextPress = clock + resetTime;	

}

function Update () {
	playerTeam = gameData.gameAttributes.teams.playerTeam;
	if (Input.GetButton("IssueOrder") && clock > nextPress && gameData.gameAttributes.inMovement == true){
		nextPress = clock + resetTime;
		setupPOI(poi_move);
		gameObject.BroadcastMessage("IssuedOrder","tactic_pcMove");
		toggleMovement();
	}
	
	if (Input.GetButton("ToggleAttack")&& clock >planningNextPress){
		print("ATTACK TOGGLE");
		if (gameData.gameAttributes.inAttack == true){
			changeAction("actionNeutral");			
		}else{
			changeAction("actionAim");			
		}
		planningNextPress = clock + resetTime;	
	}
	if (Input.GetButton("ToggleMovement") && clock >planningNextPress){
		print("ATTACK MOVEMENT");
		if (gameData.gameAttributes.inMovement == true){
			changeAction("actionNeutral");			
		}else{
			changeAction("actionMovement");			
		}
		planningNextPress = clock + resetTime;		
	}
	if (Input.GetAxisRaw("ToggleStance") && clock > stanceNextPress){
		ToggleStance();
	}


	if (Input.GetAxisRaw("SwitchTeams") && clock > stanceNextPress){
		gameData.teams.teamIndex +=Input.GetAxisRaw("SwitchTeams");
		gameData.teams.SwitchTeams();
		Invoke("ToggleStance",.3);
	}

	clock+=Time.unscaledDeltaTime;
}


function setupPOI_Stance(poi:GameObject){
	var pd:poi_data = new poi_data();
	var pos:Vector3 = gameData.gameAttributes.playerTeam.leader.transform.position;
	var obj:GameObject = Instantiate(poi,pos,Quaternion.identity);
	
	pd.team = playerTeam;
	pd.pos = obj.transform.position;	
	pd.origin = transform.position;	
	pd.Start();
	pd.obj = obj;
	obj.SendMessage("setup",pd);	
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
