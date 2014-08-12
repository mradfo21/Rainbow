#pragma strict

var lifespan:float = 10000000;
var age:float = 0.0;
var normalizedAge:float = 0.0;
function Start () {
	age+= Time.deltaTime;

}

function Update () {
	normalizedAge = age/lifespan;
}