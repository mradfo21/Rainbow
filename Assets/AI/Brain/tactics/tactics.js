#pragma strict

var team:team;
var tacticNames = new List.<String>();
var tacticObjects = new List.<GameObject>();
var tactics = new Dictionary.<String,GameObject>();
var targets = new List.<GameObject>();
var contacts = new Dictionary.<float,poi_data>();

var data:ArrayList;



var enemyContact:String;
var enemiesKilled:String;
var enemySighted:String;
var ambient:String;

function Start () {
	team = gameObject.GetComponent("team");
	data = ConstructBaseData();
	for (var i = 0; i <tacticNames.Count; i++){
		tactics[tacticNames[i]] = tacticObjects[i];
	}
}

function Update () {

}

function setup(d:boolean){
	data[0] = ambient;
	gameObject.SendMessage("changeState",data);
}

function GetTactic(name:String):GameObject{
	if (tactics.ContainsKey(name)){
		return tactics[name];
	}else{
		print("tactic "+name+" doesn't exist");
	}
}


function EnemySighted(d:boolean){
	//print("enemy sighted");
}
function EnemiesKilled(d:boolean){
	//print("enemies killed");
}
function Contact(pd:poi_data){
	for (var child:Transform in transform){
		child.SendMessage("Contact",pd);
	}
	//contacts[pd.id] = pd;
	//data[0] = enemyContact;
	//data[6] = pd;
	//gameObject.SendMessage("changeState",data);	
	//for (member in team.members){
	//	member.transform.parent.BroadcastMessage("Contact",pd);
	//}		
}
public function ConstructBaseData():ArrayList{
	var list = new ArrayList();
	list.Add("");
	list.Add(Vector3.zero);
	list.Add("");
	list.Add(0.0);
	list.Add(new GameObject());
	list.Add(false);
	list.Add(new poi_data());

	return list;
}