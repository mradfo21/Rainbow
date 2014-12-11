#pragma strict

var thing:GameObject;
var attachPoint:GameObject;
var enableOnStart:boolean = true;
var addToGuiWS:boolean = false;
var makeChild:boolean = false;
private var gameData:gameData;
var spawnedObj:GameObject;
function Start () {
	gameData = new gameData();
	gameData.Start();

	if (thing){

		var obj:GameObject = Instantiate(thing);
		if (makeChild == true){
			obj.transform.set_parent(gameObject.transform);
		}else{
			obj.transform.set_parent(transform.parent.transform);
		}
		obj.transform.position = transform.position;
		if (enableOnStart == false){
			obj.SetActive(false);
		}
	}
	if (addToGuiWS){
		thing.transform.set_parent(gameData.gameAttributes.GuiWS.transform);
	}
	spawnedObj = obj;

}

function Update () {

}

function Destroy(){
	Destroy(spawnedObj);
}