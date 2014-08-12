#pragma strict

var bone:Transform;
var gun:GameObject;
var offset = Vector3.zero;
var rotOffsetX:float = 0;
var rotOffsetY:float = 0;
var rotOffsetZ:float = 0;
private var weapon:GameObject;
var attributes:attributes;
function Start () {
	attributes = transform.parent.GetComponent("attributes");
	weapon = Instantiate(gun,bone.position,Quaternion.identity);
	weapon.transform.parent = gameObject.transform;
	var gun:gun = weapon.GetComponent("gun") as gun;
	attributes.gun = gun;
	gun.host = transform.parent.gameObject;
	gun.attributes = attributes;
}

function Update () {
	weapon.transform.position =  bone.transform.position+ Vector3.Scale(transform.forward,offset);
	weapon.transform.rotation = Quaternion.LookRotation(bone.transform.right) * Quaternion.Euler(rotOffsetX,rotOffsetY,rotOffsetZ);
}