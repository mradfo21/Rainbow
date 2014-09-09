#pragma strict

var image:UI.Image;
function Start () {
	image = gameObject.GetComponent("Image");
}

function Update () {

}
function isEnemy(){
	image.enabled = true;
}