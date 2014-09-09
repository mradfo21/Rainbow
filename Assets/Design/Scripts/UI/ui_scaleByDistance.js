#pragma strict

var initScale:Vector3;
var minDistance:float= 1.0;
var minDistanceSize:float = 1.0;
var maxDistance:float = 20.0;
var maxDistanceSize:float = 3.0;
var scaleMult:float = 1.0;
function Start () {
	initScale = transform.localScale;
}

function Update () {
	var distance = Vector3.Distance(Camera.main.transform.position,transform.position);

	scaleMult = utils.Rescale(distance,minDistance,maxDistance,minDistanceSize,maxDistanceSize);
	transform.localScale = initScale*scaleMult;
}