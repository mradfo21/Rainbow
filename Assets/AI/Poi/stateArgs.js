#pragma strict
public class stateArgs{

var gameData:gameData;
var argState;
var argVector;
var argFloat;
var argString;
var argBoolean;
var argGameObject;
var argPOI;
var list:ArrayList = new ArrayList();
function Start() {
 	gameData = new gameData();
	gameData.Start();
}

function Update () {

}

function ingest(poi:poi_data){
	argVector = poi.pos;
}

function decode():ArrayList{
	list = ConstructBaseData();
	list[0] = argState;
	list[1] = argVector;
	list[2] = argString;
	list[3] = argFloat;
	list[4] = argGameObject;
	list[5] = argBoolean;
	list[6] = argPOI;
	return list;
}
function ConstructBaseData():ArrayList{
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

}