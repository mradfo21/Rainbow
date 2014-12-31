#pragma strict
var col:Collider;
var attributes:attributes;
function Start () {
	col = gameObject.GetComponent("Collider");
}
function Update () {

}

function dead(time:float){
	col.enabled = false;
}