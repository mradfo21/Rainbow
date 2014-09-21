#pragma strict

var bone:GameObject;
var gun:GameObject;
var offset = Vector3.zero;
var rotOffsetX:float = 0;
var rotOffsetY:float = 0;
var rotOffsetZ:float = 0;
private var weapon:GameObject;
var attributes:attributes;
function Start () {
	weapon = Instantiate(gun);
	weapon.transform.parent = bone.transform;
	weapon.transform.position = Vector3.zero;
	attributes = transform.parent.GetComponent("attributes");
	var gun:gun = weapon.GetComponent("gun") as gun;
	attributes.gun = gun;
	gun.host = attributes.gameObject;
	gun.attributes = attributes;

}

function Update () {
	//weapon.transform.position = Vector3.zero;
	weapon.transform.position =  bone.transform.position;
	//weapon.transform.rotation = Quaternion.LookRotation(bone.transform.right) * Quaternion.Euler(rotOffsetX,rotOffsetY,rotOffsetZ);
}