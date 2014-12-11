#pragma strict
var prefab:GameObject;
var useAsParent:boolean;
function Start () {
	var obj:GameObject = Instantiate(prefab);
	if (useAsParent == true){
		obj.transform.set_parent(gameObject.transform);
	}else{
		obj.transform.set_parent(gameObject.transform.parent);
	}
}

function Update () {

}