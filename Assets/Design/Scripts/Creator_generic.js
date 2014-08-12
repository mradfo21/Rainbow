#pragma strict

var thing:GameObject;
var parentName:String = "";
var numCopies:int = 0;
var radius = 1.0;
var species:String = "";
var enemySpecies:String = "";

private var created = new List.<GameObject>();
var navMesh:NavMesh = null;

function NavMesh(nav:NavMesh){
	navMesh = nav;
}

function Start () {

	if (numCopies >1){
		for (var i = 0; i < numCopies; i++){
			InstantiateThing();
		}
	}else{
		InstantiateThing();		
	}

	Invoke("setupSpecies",1);
}
function setupSpecies(){
	for (obj in created){
		if(species != ""){
			obj.BroadcastMessage("SetSpecies",species,SendMessageOptions.DontRequireReceiver);		
			obj.BroadcastMessage("AddFriendlySpecies",species,SendMessageOptions.DontRequireReceiver);
		
		}
		if(enemySpecies != ""){
			obj.BroadcastMessage("AddEnemySpecies",enemySpecies,SendMessageOptions.DontRequireReceiver);
		}
	}
}
function InstantiateThing(){
	if (parentName == ""){
	var t = Instantiate(thing,randomPoint(transform.position),Quaternion.identity);
	if(transform.parent){
		t.transform.parent = transform.parent;
		created.Add(t);


	}		
	}else{
		var p:GameObject = gameObject.Find(parentName);
		var obj = Instantiate(thing,randomPoint(transform.position),Quaternion.identity);
		obj.transform.parent = p.transform;
		created.Add(obj);

	}
}

function randomPoint(originalPoint:Vector3):Vector3{
		var newPosition:Vector2 = (Random.insideUnitCircle * radius);
		var newPoint:Vector3 = originalPoint;
		newPoint.x*= newPosition.x+radius/2;
		newPoint.z*= newPosition.y+radius/2;
		var hit:NavMeshHit;
		if (navMesh.SamplePosition(originalPoint,hit,radius,-1)){
			return hit.position;
		}else{
			return originalPoint;
		}

}


function Update () {

}