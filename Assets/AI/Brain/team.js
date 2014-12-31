#pragma strict


var maxMembers:int = 9999;
var members = new List.<GameObject>();
var removeList= new List.<GameObject>();
var species:String = null;
var attribs = new Dictionary.<GameObject,attributes>();
var visions = new Dictionary.<GameObject,vision>();
var enemiesAlive = new Dictionary.<int,GameObject>();
var enemiesDistance = new List.<GameObject>();
var enemies = new Dictionary.<int,GameObject>();
var enemiesPermanent = new List.<GameObject>();

var stanceIndex:int = 3;
var poi = new List.<poi_data>();
var receivedPOI = new Dictionary.<String,float>();
var leader:GameObject = null;
var debug:boolean = true;
var currentTactic:GameObject = null;
var leaderAttributes:attributes;
var reportedEnemiesSighted:boolean = false;
var reportedEnemiesKilled:boolean = false;
var game:GameObject;
var ready:boolean = false;
var movement_positions:List.<Vector3>;
var gameData:gameData;

var orders_movement:orders_movement;
var orders_action:orders_action;

var stances:stances;
var situationalUnderstanding:situationalUnderstanding;

var boundingGroup = new Dictionary.<int, Dictionary.<GameObject, boolean> >();

function CheckLeader(){
	if (members.Count >= 1){
		leader = members[0];
		leaderAttributes = leader.GetComponent("attributes");
		leaderAttributes.leader = true;
	}else{
		leader = null;
	}
}

function changeStateTeam(from:GameObject,data:ArrayList){
	// here i cache this information so things like "contact" or
	// other poi state changes only get sent to the team one time
	// this way if a poi goes off thats like "change to assault"
	// it doesn't go off 12 times, once for each team members

	// is this deprecieated?
	//if (receivedPOI.ContainsKey(from.GetInstanceID().ToString()+data[0])){
	//}else{
	//	receivedPOI[from.GetInstanceID().ToString()+data[0]] = Time.time;
	//	gameObject.SendMessage("changeState",data);

	//}
}
function Contact(pd:poi_data){
	poi.Add(pd);
}

function updateBroundingGroup(){
}
function CheckForEnemies(){
	if (enemies.Count > 0){
		if (reportedEnemiesSighted == false){
			gameObject.SendMessage("EnemySighted",true);
			reportedEnemiesSighted= true;
			reportedEnemiesKilled= false;			
		}
	}
}
function RemoveDeadEnemies(){
	while (true){
		enemies.Clear();
		var toRemove = new List.<int>();
		for (i in enemiesAlive.Keys){
			var attrib:attributes = enemiesAlive[i].transform.parent.GetComponent("attributes");
			if (attrib.alive == false){
				toRemove.Add(i);
			} 
		}
		for (dead in toRemove){
			enemiesAlive.Remove(dead);
		}
		if (enemiesAlive.Count <=0 && reportedEnemiesKilled == false){
			gameObject.SendMessage("EnemiesKilled",true,SendMessageOptions.DontRequireReceiver);
			reportedEnemiesSighted = false;
			reportedEnemiesKilled = true;
			enemies.Clear();
		}
		yield WaitForSeconds(.5);		
	}

}
function CollectVision(){
		enemiesDistance.Clear();
		for (v in visions.Keys){
			for (eKey in visions[v].enemy.Keys){
				var attrib:attributes = visions[v].enemy[eKey].transform.parent.GetComponent("attributes");
				if (attrib.alive == true){
					enemies[eKey] =visions[v].enemy[eKey];
					enemiesAlive[eKey] =visions[v].enemy[eKey];
					enemiesDistance.Add(visions[v].enemy[eKey]);				
				}else{
					enemies.Remove(eKey);
				}
			}
		}
		CheckForEnemies();
}
function ClearDeadMembers(){
	for (var i = 0; i < members.Count; i++){
		if (attribs[members[i]].alive == false){
			removeList.Add(members[i]);
		}
	}
	for (obj in removeList){
		members.Remove(obj);
		for (bgroup in boundingGroup.Keys){
				if (boundingGroup[bgroup].ContainsKey(obj)){
					boundingGroup[bgroup].Remove(obj);
				}
		}
	}
	removeList.Clear();
	CheckTeamMembers();
}
function CheckTeamMembers(){
	for (var i = 0; i < members.Count; i++){
		attribs[members[i]] = members[i].GetComponent("attributes");
		visions[members[i]] = attribs[members[i]].brain.GetComponent("vision");
		attribs[members[i]].inTeam = true;
		attribs[members[i]].team = this;
		if (i >= 1){
			attribs[members[i]].teammateTarget = members[i-1];
			attribs[members[i]].teammateTargetAttributes = attribs[members[i-1]];
			attribs[members[i]].teamSpot = i;	
		}else{
			attribs[members[i]].teammateTarget=null;
			attribs[members[i]].teammateTargetAttributes = null;
			attribs[members[i]].teamSpot = i;	
		}
	}
}
//function OnTriggerEnter(col:Collider){
// this function enables dynamic injection of team members... might not be a good idea for now
//	var attrib = col.gameObject.transform.parent.gameObject.GetComponent("attributes") as attributes;
//	if ( members.Count <= maxMembers && !members.Contains(col.gameObject) && attrib.inTeam == false && attrib.species == species){
//		members.Add(col.gameObject);
//		CheckTeamMembers();
//		//CheckLeader();		
//	}else{
//	}
//
//}
function Start () {
	game = gameObject.Find("Game");
	StartCoroutine("RemoveDeadEnemies",1.0);
	this.name = this.name +"_"+gameObject.GetInstanceID();

	gameData = new gameData();
	gameData.Start();
	orders_movement = gameObject.GetComponent("orders_movement") as orders_movement;
	orders_action = gameObject.GetComponent("orders_action") as orders_action;
	stances = gameObject.GetComponent("stances") as stances;
	
	situationalUnderstanding = gameObject.GetComponent("situationalUnderstanding");
}
function Setup(){
	CheckTeamMembers();
	CheckLeader();
	ready = true;
	gameData.gameAttributes.teams.AddTeam(gameObject);

}
function ManageUnits(){
	if (members.Count >= 0){
		CollectVision();
		ClearDeadMembers();

	}
		if (debug == true){
			for (var i = 0; i < members.Count; i++){
				Debug.DrawLine(transform.position,members[i].transform.position,Color.yellow);
			}		
			for (e in enemies.Values){
				Debug.DrawLine(transform.position, e.transform.position,Color.red);
			}
	}
	for (enemy in enemies.Values){
		if (!enemiesPermanent.Contains(enemy)){
			enemiesPermanent.Add(enemy);
		}
	}
	CheckLeader();

}
function Update () {
	if (ready == true){
		ManageUnits();
	}

	for (var i = 0; i < movement_positions.Count; i++){
		Debug.DrawLine(members[i].transform.position,movement_positions[i]);
	}
}

function changeStances(stanceChange:ArrayList){
	for (member in members){
		member.BroadcastMessage("changeState",stanceChange);
	}
}
function changeRotationState(str:String){
	for (teammate in members){
		teammate.BroadcastMessage("changeState","rotation_"+str);
	}
}

function moveOutIndex(obj:GameObject,index:int){
	var chars = new List.<GameObject>();
		for (key in boundingGroup[index].Keys){
			if (key!= obj && boundingGroup[index].ContainsKey(obj)){
				chars.Add(key);

			}

		}
	for (characters in chars){
		characters.BroadcastMessage("moveOutGlobal");
	}
}
function setBound(obj:GameObject,index:int,value:boolean){
		boundingGroup[index][obj] =value;			
}
function getBound(obj:GameObject,index:int):boolean{
		return boundingGroup[index][obj];			
}
function getBoundBool(index){
	if (!boundingGroup.ContainsKey(index)){
		return false;
	}else{
		for (key in boundingGroup[index].Keys){
			if (boundingGroup[index][key] == false){
				return false;
			}
		}
		return true;
	}
}
function hasBound(obj:GameObject,index:int){
	if (!boundingGroup.ContainsKey(index)){
		print("index "+index + " not found");
		return false;
	}
	if (!boundingGroup[index].ContainsKey(obj)){
		print("obj "+obj + " not found");
		return false;
	}
	return true;		
}
function removeBound(obj:GameObject, index:int){
	if (hasBound(obj,index)){
		boundingGroup[index].Remove(obj);
		print("REMOVED BOUND "+index +"   "+obj);
	}
}
function setupBounding(obj:GameObject,index:int){
	if (!boundingGroup.ContainsKey(index)){
		boundingGroup[index] = new Dictionary.<GameObject,boolean>();
	}
	boundingGroup[index][obj] =false;
}