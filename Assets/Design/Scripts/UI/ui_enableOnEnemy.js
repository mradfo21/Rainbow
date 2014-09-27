#pragma strict

var attributes:attributes;
function Start () {
	attributes = gameObject.transform.parent.transform.parent.GetComponent("attributes");
}

function Update () {
	if (attributes){
		if (attributes.isEnemy == true){
			gameObject.active = false;
		}else{
			attributes.active = true;
		}
	}
}

