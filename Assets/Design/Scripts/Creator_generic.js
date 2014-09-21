#pragma strict

var thing:GameObject;
var parentName:String = "";
var numCopies:int = 0;
var radius = 1.0;
var species:String = "";
var enemySpecies:String = "";
var team:team;
var useNavMesh:boolean = true;
private var created = new List.<GameObject>();


function Start () {

	if (numCopies >1){
		for (var i = 0; i < numCopies; i++){
			InstantiateThing();
		}
	}else{
		InstantiateThing();		
	}
	if (transform.parent.gameObject.name== "TeamSpawner"){
		handleTeam(transform.parent.gameObject);
	}
	Invoke("setupSpecies",1.0);
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
	if (team){
		team.Setup();
	}
}

function handleTeam(t:GameObject){
	team = t.GetComponent("team");
	if (team.species != species){
		species = team.species;
	}
	team.members = created;
	team.maxMembers = created.Count;
}	
function InstantiateThing(){
	var origin:Vector3 = transform.position;
	var obj:GameObject;
	if (parentName == ""){
		obj = Instantiate(thing);
		if(transform.parent){
			obj.transform.parent = transform.parent;
			created.Add(obj);
	}
	}else{
		var p:GameObject = gameObject.Find(parentName);
		obj = Instantiate(thing);
		obj.transform.parent = p.transform;
		created.Add(obj);

	}
	if (useNavMesh == false){
		return origin;
	}
	obj.transform.position = randomPoint(origin);		
}

function randomPoint(originalPoint:Vector3):Vector3{
		var newPoint:Vector3 = Random.insideUnitSphere;
		var hit:NavMeshHit;
		if (NavMesh.SamplePosition(originalPoint+newPoint,hit,radius,-1)){
			return hit.position;
		}else{
			return originalPoint+newPoint;
		}

}


function Update () {

}