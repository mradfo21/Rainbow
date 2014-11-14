#pragma strict
var team:GameObject = null;
var teamActual:team = null;
var teammate:GameObject = null;
var numTeammates:int = 3;
var startRadius:float = 20;
var entitiesName:String = "entities";
var teamName:String;
var species:String ="";
var enemySpecies:String = "";
private var created = new List.<GameObject>();

	function Start () {
		Setup();
	}

	function Setup(){
		var entities = GameObject.Find(entitiesName);
		var team:GameObject = Instantiate(team,transform.position,Quaternion.identity);
		var ta = team.GetComponent("team");
		teamActual = ta;
		team.transform.parent = entities.transform;
		if (teamName != ""){
			team.name = teamName;
		}
		for (var i = 0; i < numTeammates; i++){

			var startPoint = transform.position;
			startPoint.x += Mathf.Cos(i)*startRadius;
			startPoint.z += Mathf.Sin(i)*startRadius;
			var hit = new NavMeshHit();
			NavMesh.SamplePosition(startPoint,hit,startRadius,-1);
			var ent:GameObject = Instantiate(teammate,hit.position,Quaternion.identity);
			ent.transform.parent = team.transform;
			created.Add(ent);
			if (i == 0){
				//ent.SendMessage("MakeLeader","heeey");
			}
			teamActual.members.Add(ent);
		}
		//setupSpecies();
		Invoke("setupSpecies",.3);
	}
	function Update () {

	}

	function setupSpecies(){
		teamActual.species = species;
		for (obj in created){
			if(species != ""){
				obj.BroadcastMessage("SetSpecies",species,SendMessageOptions.DontRequireReceiver);		
				obj.BroadcastMessage("AddFriendlySpecies",species,SendMessageOptions.DontRequireReceiver);
			
			}
			if(enemySpecies != ""){
				obj.BroadcastMessage("AddEnemySpecies",enemySpecies,SendMessageOptions.DontRequireReceiver);
			}
			teamActual.Setup();

		}
	}