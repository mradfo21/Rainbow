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

}

function exitPlanning(){
	gameData.gameAttributes.inPlanning = false;
	gameData.gameAttributes.timeScale = 1.0;
}
function enterPlanning(){
	gameData.gameAttributes.inPlanning = true;
	gameData.gameAttributes.timeScale = gameData.gameAttributes.timeScaleMin;	
}
function Update () {
	playerTeam = gameData.gameAttributes.teams.playerTeam;
	if (Input.GetButton("IssueOrder") && clock > nextPress){
		nextPress = clock + resetTime;
		setupPOI(poi_move);
		gameObject.BroadcastMessage("IssuedOrder","to be: an order");
		gameObject.BroadcastMessage("ExitPlanning");	

		Invoke("exitPlanning",.5*gameData.gameAttributes.timeScale);

	}
	
	if (Input.GetAxis("ToggleLook") && gameData.gameAttributes.inPlanning == false && clock >planningNextPress){
		planningNextPress = clock + resetTime;	
		gameObject.BroadcastMessage("EnterPlanning");
		enterPlanning();
		print("OK ENTERING PLAN");
	}
	if (Input.GetAxis("ToggleLook") && gameData.gameAttributes.inPlanning == true && clock >planningNextPress){
		gameObject.BroadcastMessage("ExitPlanning");	
		planningNextPress = clock + resetTime;	
		Invoke("exitPlanning",.3*gameData.gameAttributes.timeScale);
		print("OK ENDING PLAN");
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
