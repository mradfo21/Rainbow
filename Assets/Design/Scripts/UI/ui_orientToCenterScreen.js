#pragma strict

var origin:Vector3;
function Start () {

}

function Update () {
	var layerMask = 1 << 12;
	var ray : Ray = Camera.main.ViewportPointToRay (Vector3(0.5,0.5,0));
	var hit : RaycastHit;
	var point:Vector3;
	var navHit:NavMeshHit;
	if (Physics.Raycast (ray, hit,500,layerMask)){
		origin = hit.point;
	}
	gameObject.transform.LookAt(origin);
}