#pragma strict
var team:team;
var id:String;
var roles = new List.<GameObject>();
var leaderRoles= new List.<GameObject>();
var assaignedRoles = new Dictionary.<role,int>();
var data:ArrayList= null;
var argVector:Vector3;
var argString:String;
var argFloat:float;
var argBoolean:boolean = false;
var argGameObject:GameObject;
var roleCount:int = 0;
var leaderRoleCount:int = 0;
var maxRoles:int = 0;
var nextTactic:String;
var nextTacticData:ArrayList;
var membersComplete = new Dictionary.<int,GameObject>();

var friendsLiving:float;
var friendsLivingRatio:float;

var enemiesKilled:String;
var enemyContact:String;
var failure:String;
var previousLeader:GameObject;

function Start () {
	maxRoles = roles.Count;
	team = transform.parent.GetComponent("team");
	team.currentTactic = gameObject;
	print("tactic DATA: "+data);
	if (data!= null){
			id = data[0];
			argVector = data[1];		
			argString = data[2];		
			argFloat = data[3];		
			argGameObject = data[4];
			argBoolean = data[5];		
	}
	nextTacticData = ConstructBaseData();
	Invoke("assaignRoles",.03);
	friendsLiving = team.members.Count;

}


function Update () {
	// spot 0 is state name
	// spot 1 is argVector
	// spot 2 is argString
	// spot 3 is argFloat
	// spot 4 is argGameObject
	// spot 5 is argBoolean

	testForTacticCompletion();
	friendsLivingRatio = friendsLiving/team.members.Count;
	if ( friendsLivingRatio >= friendsLiving/2){
		failed();
	}
	
	if (team.leader != previousLeader){
		leaderRoleCount = 0;
		NeedsNewRole(team.leader);
	}
	previousLeader = team.leader;


}
function TacticComplete(){
	finished();
}

function Contact(pd:poi_data){
	if (enemyContact){
		data[0] = enemyContact;
		data[6] = pd;
		gameObject.SendMessageUpwards("changeState",data);	
		for (member in team.members){
			member.transform.parent.BroadcastMessage("Contact",pd);
		}		
	}	
}


function testForTacticCompletion():boolean{
	if (membersComplete.Count >= team.members.Count){
		TacticComplete();	
	}
	return true;
}
function NeedsNewRole(obj:GameObject){
	yield WaitForSeconds(1.0);
	if (obj){
		membersComplete[obj.GetInstanceID()] = obj;
		assaignRoles(obj);
	}
}
function createRole(role:GameObject,entity:GameObject){
	var r:GameObject = Instantiate(role);
	var roleComponent:role = r.GetComponent("role");
	roleComponent.data = data;
	
	for (var c:Transform in entity.transform){
		Destroy(c.gameObject);
	}
	r.transform.parent = entity.transform;
}

function assaignRoles(obj:GameObject){
	if (obj == team.leader && leaderRoles.Count > 0){
		createRole(leaderRoles[leaderRoleCount],obj);
		leaderRoleCount+=1;
		if (leaderRoleCount > leaderRoles.Count-1){
					leaderRoleCount = 0;
		}
	}else{
		createRole(roles[roleCount],obj);
		roleCount+=1;
		if ( roleCount > maxRoles-1){
			roleCount = 0;
		}		
	}

}
function finished(){
	if (nextTactic){
		nextTacticData[0] = nextTactic;
		gameObject.transform.parent.SendMessage("changeState",nextTacticData);
		Destroy(gameObject);		
	}
}
function failed(){
	if (failure){
		nextTacticData[0] = failure;
		//print("this tactic failed. changing");
		gameObject.transform.parent.SendMessage("changeState",nextTacticData);
		Destroy(gameObject);	
	}
}
function assaignRoles(){
	if (maxRoles > 0){
		for (var teammate in team.members){
			if ( teammate == team.leader && leaderRoles.Count > 0){
				//print("leader requested role");
				createRole(leaderRoles[leaderRoleCount],teammate);
				leaderRoleCount+=1;
				if (leaderRoleCount > leaderRoles.Count-1){
					leaderRoleCount = 0;
				}
			}else{
				createRole(roles[roleCount],teammate);
				roleCount+=1;
				if(roleCount > maxRoles-1){
					roleCount = 0;
				}			
			}
	
		}
	}else{
	}
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