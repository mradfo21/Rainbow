#pragma strict

function Start () {

}

function Update () {
	if (Input.GetKeyDown("space")){
		gameObject.SendMessage("changeState","debug_debug1");
	}
}