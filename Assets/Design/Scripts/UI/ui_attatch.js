#pragma strict
var boneID:String;
var attatch:GameObject;
var offset:Vector3;
var screenOffset:float = .75;

function Start () {
	Invoke("setupAttatch",.1);
}


function setupAttatch(){
	AttatchToJoint(transform.parent.gameObject,boneID);
}
function Update () {
	var distance:float = 1+Vector3.Distance(Camera.main.transform.position,transform.position)*.15;
	var coff:Vector3 = -Vector3.Cross(Camera.main.transform.forward,Vector3(0,1,0));

	transform.position = attatch.transform.position+(coff*screenOffset*distance) + offset;
}

  
function AttatchToJoint(obj:GameObject,searchName:String):GameObject{
	for(var child:Transform in obj.transform){
		if (child.gameObject.name.Contains(searchName) && !child.gameObject.name.Contains("Ctrl")){
			attatch = child.gameObject;
			return child.gameObject;
		}
		AttatchToJoint(child.gameObject,searchName);
	}
}