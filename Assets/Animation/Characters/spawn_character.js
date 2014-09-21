#pragma strict

var character:GameObject;
function Start () {
	var obj:GameObject = Instantiate(character);
	obj.transform.parent = gameObject.transform;
}

function Update () {

}