#pragma strict
var attatch:GameObject;
var offset:Vector3;
var screenOffset:float = .75;

function Start () {

}

function Update () {
	var distance:float = 1+Vector3.Distance(Camera.main.transform.position,transform.position)*.15;
	var coff:Vector3 = -Vector3.Cross(Camera.main.transform.forward,Vector3(0,1,0));

	transform.position = attatch.transform.position+(coff*screenOffset*distance) + offset;
}

   