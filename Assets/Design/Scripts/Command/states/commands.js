#pragma strict
var gameData:gameData;
var playerTeam:team;
var nextPress:float = 0.0;
var resetTime:float = .1;
var layerMask:int;        
var poi_move:GameObject;

var poi_stance_prone:GameObject;
var poi_stance_crouch:GameObject;
var poi_stance_run:GameObject;
var poi_stance_sprint:GameObject;

var stanceIndex:int = 1;

var stanceMap = new Dictionary.<int,GameObject>();

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
function changeCamera(state:String){
	gameData.cameraManager.changeState(state);

}

function ToggleStance(){
		nextPress = clock + resetTime;	
		gameData.gameAttributes.playerTeam.stanceIndex += Input.GetAxisRaw("ToggleStance");
		if (stanceIndex > 4){
			stanceIndex=4;
		}
		if (stanceIndex < 1){
			stanceIndex = 1;
		}
		setupPOI_Stance(stanceMap[gameData.gameAttributes.playerTeam.stanceIndex]);
		
}


function Update () {
	playerTeam = gameData.gameAttributes.teams.playerTeam;
	if (Input.GetButton("IssueOrder") && clock > nextPress && gameData.gameAttributes.inAction("Movement") == true){
		issuePointOrder();
	}
	
	if (Input.GetButton("ToggleAttack")&& clock >nextPress){
		if (gameData.gameAttributes.inAction("Aim") == true){
			changeAction("actionNeutral");			
		}else{
			changeAction("actionAim");			
		}
		print("crashy crashy");
		nextPress = clock + resetTime;	
	}


	if (Input.GetButton("ToggleMovement") && clock >nextPress){
		if (gameData.gameAttributes.inAction("Movement") == true){
			changeAction("actionNeutral");			
		}else{
			changeAction("actionMovement");			
		}
		print("crashy crashy");
		nextPress = clock + resetTime;		
	}


	if (Input.GetAxisRaw("ToggleStance") && clock > nextPress){
		ToggleStance();
		nextPress = clock + resetTime;		

	}


	if (Input.GetAxisRaw("SwitchTeams") && clock > nextPress){
		gameData.teams.teamIndex +=Input.GetAxisRaw("SwitchTeams");
		gameData.teams.SwitchTeams();
		Invoke("ToggleStance",.3);
		nextPress = clock + resetTime;		

	}

	if (Input.GetButton("test") && clock >nextPress){
		issueCodeOrder();	
		nextPress = clock + resetTime;		
	}

	if (Input.GetButton("NavVertical") && clock >nextPress){	
		nextPress = clock + resetTime;
		gameData.orderManager.orderMenu.switchOrder(Input.GetAxisRaw("NavVertical") );
		
	}

	if (Input.GetButton("one") && clock >nextPress){
		print("ONE");

		nextPress = clock + resetTime;
		if (gameData.orderManager.orderMenu.menuOpen == true){
			gameData.orderManager.set_one();		
		}
	}
	if (Input.GetButton("two") && clock >nextPress){
		print("TWO");
		nextPress = clock + resetTime;
		if (gameData.orderManager.orderMenu.menuOpen == true){
			gameData.orderManager.set_two();		
		}		
	}
	if (Input.GetButton("three") && clock >nextPress){
		print("THREE");
		nextPress = clock + resetTime;	
		if (gameData.orderManager.orderMenu.menuOpen == true){
			gameData.orderManager.set_three();		
		}
	}
	if (Input.GetButton("four") && clock >nextPress){
		print("FOUR");
		nextPress = clock + resetTime;
		if (gameData.orderManager.orderMenu.menuOpen == true){
			gameData.orderManager.set_four();		
		}
	}

	clock+=Time.unscaledDeltaTime;
}


function issuePointOrder(){
	nextPress = clock + resetTime;
	setupPOI(poi_move);
	gameObject.BroadcastMessage("IssuedOrder","tactic_pcMove");
	changeAction("actionNeutral");	
}
function issueCodeOrder(){
	gameData.orderManager.orderMenu.buildMenu("movement");
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
