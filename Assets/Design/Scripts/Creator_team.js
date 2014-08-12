#pragma strict
var team:GameObject = null;
var teammate:GameObject = null;
var numTeammates:int = 3;
var startRadius:float = 20;
var entitiesName:String = "entities";
var teamName:String;
var species:String ="";
var enemySpecies:String = "";
private var created = new List.<GameObject>();

	function Start () {
		var entities = GameObject.Find(entitiesName);
		var team:GameObject = Instantiate(team,transform.position,Quaternion.identity);
		team.transform.parent = entities.transform;
		if (teamName != ""){
			team.name = teamName;
		}
		for (var i = 0; i < numTeammates; i++){

			var startPoint = transform.position;
			startPoint.x += startRadius*i;
			var ent:GameObject = Instantiate(teammate,startPoint,Quaternion.identity);
			ent.transform.parent = team.transform;
			created.Add(ent);
			if (i == 0){
				ent.SendMessage("MakeLeader","heeey");
			}
		}
		Invoke("setupSpecies",1);
	}

	function Update () {

	}

	function setupSpecies(){
		for (obj in created){
			print("trying to send species data for"+obj);
			if(species != ""){
				obj.BroadcastMessage("SetSpecies",species,SendMessageOptions.DontRequireReceiver);		
				obj.BroadcastMessage("AddFriendlySpecies",species,SendMessageOptions.DontRequireReceiver);
			
			}
			if(enemySpecies != ""){
				obj.BroadcastMessage("AddEnemySpecies",enemySpecies,SendMessageOptions.DontRequireReceiver);
			}
		}
	}