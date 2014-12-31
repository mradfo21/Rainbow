#pragma strict
var gameData:gameData;


var stanceNames = new List.<String>();
var stanceStates = new List.<String>();
var stanceDict = new Dictionary.<String, String>();

var stanceCameraNames = new List.<String>();
var stanceCameraStates = new List.<String>();
var stanceCameraDict = new Dictionary.<String, String>();

var currentStanceIndex:int = 0;
var currentSMstance:String;
var currentStanceName:String;
var currentStanceState:String;

var lastIndex:int = 99999;

var cAction:String;
var pAction:String;

var cStance:String;

var stanceStateMachine:stateMachine_stance;
var team:team;


function Start () {
	for (var i = 0; i < stanceNames.Count; i ++){
		stanceDict[stanceNames[i]] = stanceStates[i];
	}
	for (var j = 0; j < stanceCameraNames.Count; j ++){
		stanceCameraDict[stanceCameraNames[j]] = stanceCameraStates[j];
	}
	gameData = new gameData();
	gameData.Start();
	team = gameObject.GetComponent("team");
	Invoke("StanceChanged",2.0);
}

function Update () {
	if (gameData.gameAttributes.playerAttributes){
		stanceStateMachine = gameData.gameAttributes.playerAttributes.brain.GetComponent("stateMachine_stance");
		cAction = gameData.gameAttributes.getCurrentAction();
		cStance = stanceStateMachine.currentState;
		if (currentStanceIndex > stanceNames.Count-1){
			currentStanceIndex = stanceNames.Count-1;
		}
		if (currentStanceIndex < 0){
			currentStanceIndex = 0;
		}
		currentStanceName = stanceNames[currentStanceIndex];
		currentStanceState = stanceDict[currentStanceName];

		if (lastIndex != currentStanceIndex){
			StanceChanged();
		}
		lastIndex = currentStanceIndex;
		if (pAction!=cAction){
			changeCamera(false);
		};
		pAction = cAction;
	}
}

function changeCamera(sm:boolean){
	var action:String;
	if (sm == false){
		action = gameData.gameAttributes.getCurrentAction() + currentStanceName;
		gameData.cameraManager.changeState(stanceCameraDict[action]);
	}else{
		action = gameData.gameAttributes.getCurrentAction() + cStance;
		gameData.cameraManager.changeState(stanceCameraDict[action]);

	}

}
function StanceChanged(){
	//print("CHANGED STANCE");
	var data:ArrayList = utils.ConstructBaseData();
	data[0] = "stance_"+currentStanceState;
	//print("trying to send: "+data[0]);
	gameObject.SendMessage("changeState",data);
	team.changeStances(data);
	changeCamera(false);
}