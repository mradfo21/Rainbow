#pragma strict

var bone:GameObject;
var gunToSpawn:GameObject;
var gunObj:GameObject;
var gun:gun;
var offset = Vector3.zero;
var rotOffsetX:float = 0;
var rotOffsetY:float = 0;
var rotOffsetZ:float = 0;
private var weapon:GameObject;
var attributes:attributes;
var ready:boolean = false;
var foundBone:boolean = false;
function Start () {
	attributes = transform.parent.GetComponent("attributes");


}

function BirthGun(){
	weapon = Instantiate(gunToSpawn);
	weapon.transform.parent = bone.transform;
	weapon.transform.localPosition = Vector3.zero;
	weapon.transform.localRotation.eulerAngles = Vector3(0,0,0);
	gunObj = weapon;
	gun = gunObj.GetComponent("gun") as gun;
	attributes.gun = gun;
	gun.host = attributes.gameObject;
	gun.attributes = attributes;	
}
function Update () {
	if (foundBone == false){
		var b:GameObject;
		b = AttatchToJoint(gameObject,"RightHandMiddle1");
		if (b){
			attributes.gunBone = b;
			bone = b;
		}
	}
	if (attributes.gunBone && ready == false){
		BirthGun();
		ready = true;
	}
	//if (ready == true){
	//	gun.attributes = attributes;
	//	attributes.gun = gun;
	//	bone = attributes.gunBone;
	//	weapon.transform.position = Vector3.zero;
	//	weapon.transform.position =  bone.transform.position;
	//	weapon.transform.rotation = Quaternion.LookRotation(-bone.transform.up) * Quaternion.Euler(rotOffsetX,rotOffsetY,rotOffsetZ);

	//}
}

function AttatchToJoint(obj:GameObject,searchName:String):GameObject{
	for(var child:Transform in obj.transform){
		if (child.gameObject.name.Contains(searchName) && !child.gameObject.name.Contains("Ctrl")){
			attributes.gunBone = child.gameObject;
			bone = child.gameObject;
			foundBone = true;
			return child.gameObject;
		}
		AttatchToJoint(child.gameObject,searchName);
	}
}