#pragma strict

var aimObject:GameObject;
var attatch:GameObject;
var boneName:String;
var attributes:attributes;
var foundBone:boolean = false;

function Start () {
	attributes = transform.parent.GetComponent("attributes");

}

function Update () {
	if (foundBone == false){
		var b:GameObject;
		b = AttatchToJoint(gameObject,"Head");
		if (b){
			attatch = b;
		}
		var obj:GameObject = Instantiate(aimObject);
		obj.transform.position = Vector3.zero;
		if (attatch){
			obj.transform.parent = attatch.transform;
			obj.transform.localPosition = Vector3(1,-.35,-1.3);
			obj.transform.rotation.eulerAngles = Vector3(0,0,0);
			foundBone = true;

			var cam:Camera = obj.GetComponentInChildren(Camera);
			attributes.aimCam = cam;
			attributes.aimObj = obj;
		}
	}
}

function AttatchToJoint(obj:GameObject,searchName:String):GameObject{
	for(var child:Transform in obj.transform){
		if (child.gameObject.name.Contains(searchName) && !child.gameObject.name.Contains("Ctrl")){
			attributes.gunBone = child.gameObject;
			attatch = child.gameObject;
			foundBone = true;
			return child.gameObject;
		}
		AttatchToJoint(child.gameObject,searchName);
	}
}