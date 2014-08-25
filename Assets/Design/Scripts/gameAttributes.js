#pragma strict

var player:GameObject;
var playerAttributes:attributes;
function Start () {

}

function Update () {

}

function SetPlayer(p:GameObject){
	player = p.transform.parent.gameObject;
	playerAttributes = player.GetComponent("attributes");
}