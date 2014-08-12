#pragma strict
var alive:boolean = true;
var onlyCollider:boolean = false;
function Start () {

}

function Update () {

}
function dead(time:float){

	alive = false;
	var col:Collider = gameObject.GetComponent("Collider");
	if (onlyCollider == true){
		if (col){
			col.enabled = false;			
		}
	}else{
		enabled = false;
		if (col){
			col.enabled = false;			
		}		
	}
}