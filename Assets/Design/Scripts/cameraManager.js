#pragma strict

var cam:GameObject;
var camHead:GameObject;

function Start () {

}

function Update () {
	cam = Camera.main.gameObject;
	camHead = gameObject.Find("Cameras");
}

