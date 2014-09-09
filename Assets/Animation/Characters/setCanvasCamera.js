#pragma strict
var canvas:Canvas;

function Start () {
	canvas = gameObject.GetComponent("Canvas");
}

function Update () {
	print("ok heres the canvas:  "+canvas);
}