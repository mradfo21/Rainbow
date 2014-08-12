#pragma strict

private var fire:boolean = false;
function Start () {

}

function Update () {
	renderer.enabled = false;
}

function Fired(from:GameObject){
	renderer.enabled = true;
}