#pragma strict

	var rotationOffset:Vector3;
	var transformOffset:Vector3;
	var initScale:Vector3;
	var xOnly:boolean = true;

function Start () {
	initScale = transform.localScale;
	transform.position+= transformOffset;


}

function Update () {
	var v:Vector3 = Camera.main.transform.position;
	if (xOnly == true){
		transform.LookAt(Vector3(v.x,transform.position.y,v.z),Vector3(0,1,0));
	}else{
		transform.LookAt(v);		
	}
	transform.Rotate(rotationOffset);
}