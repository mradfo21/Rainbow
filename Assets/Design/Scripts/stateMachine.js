#pragma strict
var previousState: String = null;
var previousStateData:ArrayList = null;

var currentState:String = null;
var currentStateData:ArrayList = null;
var currentStateObj:state = null;

var defaultState: String = null;
var id:String=null;

var gameData:gameData;
function Start () {
	if (defaultState){
		changeState(id+"_"+defaultState);
	}
 	gameData = new gameData();
	gameData.Start();

}

function Update () {
	if (currentStateObj){
		currentStateObj.Execute();
	}

}

function changeState(state:String){
		// this changes the state based off a single string
		var words = state.Split("_"[0]);
		state = words[1];
		var sID = words[0];
		if(sID == id){
			if (state == "previous"){
				changeStateLogic(previousState,previousStateData);
			}else{
				changeStateLogic(state);					
			}
		}

}
function changeState(data:ArrayList){
	// this changes the state with arguments. data[0] should hold the state name
	// which is in format statemachineType_name aka combat_attack
	// its in the same format that changeState(string accepts)
	// spot 0 is state name
	// spot 1 is argVector
	// spot 2 is argString
	// spot 3 is argFloat
	// spot 4 is argGameObject
	// spot 5 is argBoolean

	var sinfo:String = data[0];
	
	var words = sinfo.Split("_"[0]);
	var state:String = words[1];
	var sID = words[0];
	if(sID == id){
		changeStateLogic(state,data);
	}

}
function changeStateLogic(state:String){
	if (currentStateObj){
		currentStateObj.Exit();
	}
	if (previousState == ""){
		previousState = state;
		previousStateData = ConstructBaseData();
	}else{
		previousState = currentState;
		previousStateData = currentStateData;
	}

	currentState = state;
	currentStateData = ConstructBaseData();
	currentStateData[0] = state;
	currentStateObj = gameObject.AddComponent(System.Type.GetType(state));
	currentStateObj.data = currentStateData;
	currentStateObj.Enter();

}

function changeStateLogic(state:String,data:ArrayList){
	// ok so this handles the switching. the important thing to remember here is the dead of 
	// data being in an arrayList
	// spot 0 is state name
	// spot 1 is argVector
	// spot 2 is argString
	// spot 3 is argFloat
	// spot 4 is argGameObject
	// spot 5 is argBoolean

	if (currentStateObj){
		currentStateObj.Exit();
	}
	if (previousState == ""){
		previousState = state;
		previousStateData = data;
	}else{
		previousState = currentState;
		previousStateData = currentStateData;
	}
	currentState = state;
	currentStateData = data;
	currentStateObj = gameObject.AddComponent(System.Type.GetType(state));
	currentStateObj.data = data;
	currentStateObj.Enter();

}
public function ConstructBaseData():ArrayList{
	var list = new ArrayList();
	list.Add("");
	list.Add(Vector3.zero);
	list.Add("");
	list.Add(0.0);
	list.Add(new GameObject());
	list.Add(false);
	list.Add(new poi_data());
	list.Add(new orderData());

	return list;
}