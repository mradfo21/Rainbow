#pragma strict

private var fire:boolean = false;
function Start () {

}

function Update () {
	GetComponent.<Renderer>().enabled = false;
}

function Fired(from:GameObject){
	GetComponent.<Renderer>().enabled = true;
}