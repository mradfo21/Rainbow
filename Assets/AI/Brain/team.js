#pragma strict


var maxMembers:int = 6;
var members = new List.<GameObject>();
var removeList= new List.<GameObject>();
var species:String = null;
var attribs = new Dictionary.<GameObject,attributes>();
var visions = new Dictionary.<GameObject,vision>();
var enemiesAlive = new Dictionary.<int,GameObject>();
var enemiesDistance = new List.<GameObject>();
var enemies = new Dictionary.<int,GameObject>();
var enemiesPermanent = new List.<GameObject>();

var poi = new List.<poi_data>();
var receivedPOI = new Dictionary.<String,float>();
var leader:GameObject = null;
var debug:boolean = true;
var currentTactic:GameObject = null;
var leaderAttributes:attributes;
var reportedEnemiesSighted:boolean = false;
var reportedEnemiesKilled:boolean = false;
var averagePosition:Vector3;
var game:GameObject;
var ready:boolean = false;
function CheckLeader(){
	if (members.Count >= 1){
		leader = members[0];
		leaderAttributes = leader.GetComponent("attributes");
		leaderAttributes.leader = true;
	}else{
		leader = null;
	}
}

function findAveragePosition():Vector3{
	var pos:Vector3 = Vector3.zero;
	for (i in members){
		pos+= i.transform.position;
	}
	return pos/members.Count;
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
function GeneratePosition():Vector3{
	var n:int = 1;
	var p:Vector3 = Vector3.zero;
	for (var i = 0; i < members.Count; i++){
		p+= members[i].transform.position;
		n+=1;
	}
	if (n > 0){
		p/=n;
		return p;
	}else{
		return transform.position;
	}
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
			gameObject.SendMessage("EnemiesKilled",true);
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
			for (eKey in visions[v].enemies.Keys){
				var attrib:attributes = visions[v].enemies[eKey].transform.parent.GetComponent("attributes");
				if (attrib.alive == true){
					enemies[eKey] =visions[v].enemies[eKey];
					enemiesAlive[eKey] =visions[v].enemies[eKey];
					enemiesDistance.Add(visions[v].enemies[eKey]);				
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
	game.SendMessage("AddTeam",gameObject);
}
function Setup(){
	CheckTeamMembers();
	CheckLeader();
	ready = true;
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
	averagePosition = findAveragePosition();

}
function Update () {
	if (ready == true){
		ManageUnits();
	}
}