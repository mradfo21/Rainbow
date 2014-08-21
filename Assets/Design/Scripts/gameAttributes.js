#pragma strict

var player:GameObject;
var playerAttributes:attributes;
function Start () {

}

function Update () {

}

function SetPlayer(p:GameObject){
	print("player received "+p);
	player = p.transform.parent.gameObject;
	playerAttributes = player.GetComponent("attributes");
}