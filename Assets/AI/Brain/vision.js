﻿#pragma strict

	var visionCone:float = 100;
	var description:String;
	var friendlySpecies = new ArrayList();
	var enemySpecies = new ArrayList();
	var memeoryLength:float = 3;
	var debug_visible:boolean = false;
	var debug_seen:boolean = false;
	var debug_enemies:boolean = false;
	var debug_target:boolean = false;
	var targeting = ArrayList();
	var navMesh:NavMesh;
	var broadcastTo:String = "";
	var timeSinceTarget:float = 0;
	var agent:NavMeshAgent;
	var attributes:attributes;

	private var broadcastObj:GameObject;
	private var data = new Array();

	private var visible = new Dictionary.<int,GameObject>();
	private var seen = new Dictionary.<int,GameObject>();
	private var friends = new Dictionary.<int,GameObject>();
	var enemies = new Dictionary.<int,GameObject>();
	var friendlies = new List.<GameObject>();

	private var targets = new List.<GameObject>();
	var currentTarget:GameObject;
	private var entities;

	function EraseMemory():IEnumerator{
		while(1){
			seen.Clear();
			yield WaitForSeconds(memeoryLength);
		}		

	}
	function chooseTarget(){
		if (targets.Count >0){
			if(Vector3.Distance(transform.position,targets[0].transform.position) > attributes.visionRange){
				attributes.hasTarget = false;
				attributes.target = null;
			}else{
				currentTarget = targets[0];
				// this is important it helps determine in the combat state machine if there is
				// anything to shoot at
				attributes.hasTarget = true;
				attributes.target = currentTarget;				
			}


		}else{
			attributes.hasTarget = false;
			attributes.target = null;
		}
	}

	function enemiesToTargets(){
			targets.Clear();
			currentTarget = null;
			for ( obj in enemies.Values){
				targets.Add(obj);
			}
			targets.Sort(compare_distance);
			chooseTarget();			
	}
	function findFriendlies(){
			friendlies.Clear();
			for ( obj in friends.Values){
				friendlies.Add(obj);
			}
			friendlies.Sort(compare_distance);
			if (friendlies.Count > 0){
				attributes.nearestFriend = friendlies[0];
				attributes.friendlies = friendlies;				
			}else{
				attributes.nearestFriend = null;
			}
	}
	function compare_distance(a:GameObject,b:GameObject):int{
		var distanceA:float = Vector3.Distance(transform.position,a.transform.position);
		var distanceB:float = Vector3.Distance(transform.position,b.transform.position);
		if (distanceA == distanceB){
			return 0;
		}
		if (distanceA > distanceB){
			return 1;
		}else{
			return -1;
		}
	}


	function FindSpeciesVisible():IEnumerator{
		// loops through friendly species
		// is a friend or enemy and then adds it to allies or enemies
		while(1){
		enemies = visible;
		enemiesToTargets();
		findFriendlies();
		yield WaitForSeconds(.2);

		}

	}
	
	function Start () {
		attributes = gameObject.transform.parent.GetComponent("attributes") as attributes;
		agent = attributes.agent;
		StartCoroutine(	FindSpeciesVisible());
		//StartCoroutine(	FindSpeciesVisible());
		if (broadcastTo!= ""){
			broadcastObj = gameObject.Find(broadcastTo);	
		}else{
			broadcastObj = transform.parent.gameObject;
		}


	}
	function debug(){
		if (debug_visible){
			for (var obj in visible.Values){
				Debug.DrawLine(transform.position,obj.transform.position,Color.yellow);
			}
		}
		if (debug_seen){
			for (var obj in seen.Values){
				Debug.DrawLine(transform.position,obj.transform.position,Color.white);
			}
		}


		if (debug_enemies){
			for (var obj in enemies.Values){
				Debug.DrawLine(transform.position,obj.transform.position,Color.red);
			}
		}

		if (debug_target){
			if (currentTarget){
			Debug.DrawLine(transform.position,currentTarget.transform.position,Color.red);
			}
		}
	}

	function Update () {
		debug();
		checkVisibility();
		chooseTarget();
	}

	function updateTargeting(){
		targeting[1] = enemies;
		targeting[2] = targets;
		targeting[3] = currentTarget;
	}
	function AddFriendlySpecies(s:String){
		attributes.species = s;
	}
	function AddEnemySpecies(s:String){
		enemySpecies.Add(s);
	}
	function removeGameObject(obj:GameObject){
		var id = obj.GetInstanceID();
		if (visible.ContainsKey(id)){
			visible.Remove(id);
		}
		if (seen.ContainsKey(id)){
			seen.Remove(id);
		}
	}
	function OnTriggerEnter(other:Collider){
		send_ping(other);

	}
	function OnTriggerExit(other:Collider){
		var obj:GameObject = other.gameObject;
		removeGameObject(obj);


	}
	function send_ping(thing:Collider){
		thing.gameObject.SendMessageUpwards("spotted",gameObject,SendMessageOptions.DontRequireReceiver);
	}

	function inVisionCone(obj:GameObject):boolean{
		var dir:Vector3 = transform.position - obj.transform.position;
		if (Vector3.Angle(dir,transform.forward) > visionCone*.5){
			return true;
		}else{
			return false;
		}
	}
	function checkVisibility(){
		visible.Clear();
		var hit:NavMeshHit;
		for (k in seen.Keys){
			var visibleAttrib:attributes = seen[k].transform.parent.GetComponent("attributes");
			if (visibleAttrib.alive == true){
				if (inVisionCone(seen[k]) == true){
					if (!agent.Raycast(seen[k].transform.position,hit)){
							visible[k] = seen[k];
					}				
				}
			}
		}
	}
	function receive_ping(data:ArrayList){
		var description:String = data[0];
		var obj:GameObject = data[1];
		var species:String = data[2];
		var id = obj.GetInstanceID();
		if (species == "poi"){
			//print("found a point of interest");
		}else{
			var entity = obj.transform.parent;
			var attribs:attributes = entity.GetComponent("attributes");
			if (attribs.alive == true){
				if (species!= "poi"){
							if (attributes.species != species){
								gameObject.transform.parent.BroadcastMessage("Hint",obj.transform.position);
								seen[id] = obj;
							}else{
								if (obj != gameObject){
									friends[id] = obj;
								}
							}
				}
			}

		}






	}

function dead(time:float){
	this.enabled = false;
}


