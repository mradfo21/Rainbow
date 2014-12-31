#pragma strict

var character:GameObject;
var useProfile:boolean = true;
function Start () {
	if (useProfile == false){
		initCharacter(character);
	}
}

function Update () {

}
function initCharacter(obj:GameObject){
	var thing:GameObject = Instantiate(obj);
	thing.transform.parent = gameObject.transform;
	thing.AddComponent.<freeze>();
}
function SpawnCharacter(obj:GameObject){
	initCharacter(obj);
	//print("RECEIVED SPAWN ORDER");

}