
#pragma strict

var camHead:GameObject;
var cam:GameObject;
var renderCamera:Camera;
function setup(){
	camHead = gameObject.Find("Orbit");
	cam = gameObject.Find("Cam");
	renderCamera = cam.GetComponent("Camera");	
}
function Start () {

}

function Update () {
	//if (!renderCamera){
		setup();
	//}
}
function changeState(state:String){
	camHead.transform.parent.gameObject.BroadcastMessage("changeState","camera_"+state);
}

