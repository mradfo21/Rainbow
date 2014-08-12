#pragma strict

var attributes:attributes;

function Start () {
	attributes = gameObject.transform.parent.GetComponent("attributes") as attributes;

}

function Update () {

}

function EnemyContact(data:poi_data){
		if (attributes.team){
			if (attributes.species!= data.species){
				attributes.team.SendMessage("Contact",data);
			}
		}
}