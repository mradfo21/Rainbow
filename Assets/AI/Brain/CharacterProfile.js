#pragma strict

var maxHealth:float;
var speed:float;
var spottedRange:float;
var attackRange:float;
var accuracy:float;
var damageMod:float;
var stealthiness:float;
var character:GameObject;


function Start () {

}

function Update () {

}

function InjectCharacter(host:GameObject){
	//print("sending character command from: "+host +" of " + character);
	host.BroadcastMessage("SpawnCharacter",character);
}
function InjectAttributes(attributes:attributes){
	attributes.health = maxHealth;
	attributes.visionRange_spotted = spottedRange;
	attributes.visionRange_attacked = attackRange;
	attributes.accuracy = accuracy;
	attributes.damageMod = damageMod;
	attributes.stealthiness = stealthiness;
}