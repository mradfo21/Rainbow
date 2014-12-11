
#pragma strict

var camHead:GameObject;
var cam:GameObject;

function Start () {

}

function Update () {
}
function changeState(state:String){
	camHead.transform.parent.gameObject.BroadcastMessage("changeState","camera_"+state);
}

