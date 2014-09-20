#pragma strict

var maxHealth:float;
var speed:float;
var spottedRange:float;
var attackRange:float;
var accuracy:float;
var damageMod:float;
var stealthiness:float;



function Start () {
	Inject();

}

function Update () {

}

function Inject(){
	print("INJECTING ATTRIBUTES");
	var host:GameObject;
	host = transform.parent.gameObject;
	var attributes:attributes = host.GetComponent("attributes");

	attributes.health = maxHealth;
	attributes.visionRange_spotted = spottedRange;
	attributes.visionRange_attacked = attackRange;
	attributes.accuracy = accuracy;
	attributes.damageMod = damageMod;
	attributes.stealthiness = stealthiness;
}