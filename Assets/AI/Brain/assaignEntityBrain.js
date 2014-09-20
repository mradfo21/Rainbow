#pragma strict

var attributes:attributes;
function Start () {
	attributes = transform.parent.GetComponent("attributes");
	attributes.brain = gameObject;
}

function Update () {

}