#pragma strict
	var visionCone:float = 160;
	var debug_visible:boolean = false;
	var debug_allies:boolean = false;
	var debug_enemies:boolean = false;
	var debug_seen:boolean = false;
	var friendlySpecies = new ArrayList();
	var enemySpecies = new ArrayList();

	private var seen = new Dictionary.<int,GameObject>();
	private var speciesMap = new Dictionary.<int,String>();
	private var allies = new Dictionary.<int,GameObject>();
	private var enemies = new Dictionary.<int,GameObject>();

function Start () {
	StartCoroutine(	FindSpeciesVisible());
}

function Update () {
	debug();
}

function emit(){
	gameObject.BroadcastMessage("poi_seen",seen);
	gameObject.BroadcastMessage("poi_allies",allies);
	gameObject.BroadcastMessage("poi_enemies",enemies);

}
function debug(){

		if (debug_seen){
			for (var obj in seen.Values){
				Debug.DrawLine(transform.position,obj.transform.position,Color.white);
			}
		}

		if (debug_allies){
			for (var obj in allies.Values){
				Debug.DrawLine(transform.position,obj.transform.position,Color.green);
			}
		}

		if (debug_enemies){
			for (var obj in enemies.Values){
				Debug.DrawLine(transform.position,obj.transform.position,Color.red);
			}
		}
	}

	function OnTriggerEnter(other:Collider){
		send_ping(other);

	}
	function OnTriggerExit(other:Collider){
		removeGameObject(other.gameObject);
	}
	function removeGameObject(obj:GameObject){
		if (seen.ContainsKey(obj.GetInstanceID())){
			seen.Remove(obj.GetInstanceID());
		}
		if (speciesMap.ContainsKey(obj.GetInstanceID())){
			speciesMap.Remove(obj.GetInstanceID());
		}

	}

	function send_ping(thing:Collider){
		thing.gameObject.SendMessageUpwards("spotted",gameObject,SendMessageOptions.DontRequireReceiver);
	
	}
	function AddFriendlySpecies(s:String){
		friendlySpecies.Add(s);
	}
	function AddEnemySpecies(s:String){
		enemySpecies.Add(s);

	}
	function FindSpeciesVisible():IEnumerator{

		// loops through friendly species
		// trys to see if the entities in the speciesMap- which should be every entity that gets seen
		// is a friend or enemy and then adds it to allies or enemies
		while(1){
			enemies.Clear();
			allies.Clear();
			for (var fs in friendlySpecies){
				for (var key in speciesMap.Keys){
					var entitySpecies:String =speciesMap[key];
					var entity:GameObject = seen[key];

					//print(" targeting other guy "+key+"is of species "+speciesMap[key]);
					//print("actual game obj is: "+visible[key]);
					if (fs == entitySpecies){
						// see if its a friend
						allies[entity.GetInstanceID()] = entity;
					}else{
						// if not, see if its an enemy. 
						// this is ideal but hurts the framerate
						//for (var es in enemySpecies){
						//	if ( es == entitySpecies){
								enemies[entity.GetInstanceID()] = entity;
						//	}
						//}
					}
				}
			}
		emit();
		yield WaitForSeconds(.2);

		}

	}
	function receive_ping(data:ArrayList){
		// i have to filter out for other POI's  or else the game crashes. i think im not passing data from the POI's vision correctly somehow
		// is there ever a reason a POI would need to see another POI?
		if (data[2] != "poi"){
			var description:String = data[0];
			var obj:GameObject = data[1];
			var species:String = data[2];
			var id = obj.GetInstanceID();
			var entity = obj.transform.parent;
			var attribs:attributes = entity.GetComponent("attributes");
			//print("POI receiving ping");
			if (attribs.alive == true){
					seen[id] = obj;
					speciesMap[id]=species;			
			}

		}





	}