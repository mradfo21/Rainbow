#pragma strict

var thing:GameObject;
var attachPoint:GameObject;
var enableOnStart:boolean = true;
function Start () {
	if (thing){

		var obj:GameObject = Instantiate(thing);
		obj.transform.parent = transform.parent;
		if (enableOnStart == false){
			obj.active = false;
		}
	}
}

function Update () {

}