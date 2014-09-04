#pragma strict
var text:GUIText;

function Start () {
	text = gameObject.GetComponent("GUIText");
}

function Update () {
	var fromPos = gameObject.transform.parent.transform.position;
	var offset:Vector3;
	offset.y+=1.8;
	offset+= gameObject.transform.parent.transform.right*.4;

	transform.position = worldToScreen(fromPos + offset);
}

function worldToScreen(point:Vector3):Vector3{
	var screenCoord:Vector3 = Camera.main.WorldToViewportPoint(point);

	return screenCoord;
}