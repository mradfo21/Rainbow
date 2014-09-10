#pragma strict

function Start () {

}

function Update () {
	var layerMask = 1 << 12;
	var ray : Ray = Camera.main.ViewportPointToRay (Vector3(0.5,0.5,0));
	var hit : RaycastHit;
		if (Physics.Raycast (ray, hit,500,layerMask)){
			transform.position = hit.point;
		}
}