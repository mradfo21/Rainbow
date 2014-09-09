#pragma strict
var prefab:GameObject;

function Start () {
	var obj:GameObject = Instantiate(prefab);
	obj.transform.parent = gameObject.transform.parent;
}

function Update () {

}