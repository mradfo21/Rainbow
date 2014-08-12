#pragma strict
import System.Collections.Generic;
var stateMachine:String;
var state:String;

var argFloat:float;
var argString:String;
var trackGameObject:boolean = false;

var alliesOnly:boolean = false;
var enemiesOnly:boolean = false;
var withinDistance:float = 0.0;

private var seen = new Dictionary.<int,GameObject>();
private var allies = new Dictionary.<int,GameObject>();
private var enemies = new Dictionary.<int,GameObject>();

private var tagged_seen = new Dictionary.<int,GameObject>();
private var tagged_allies = new Dictionary.<int,GameObject>();
private var tagged_enemies = new Dictionary.<int,GameObject>();

var data:ArrayList;
function Start () {
data = ConstructBaseData();
	data[0] = stateMachine+"_"+state;
	data[1] = transform.position;
	data[2] = argString;
	data[3] = argFloat;
	data[4] = gameObject;
	// this is a hack, it just sets the argBoolean to be true.
	// the state has to then look at this and say "ok, then track the position of the gameObject"
	data[5] = trackGameObject;
}
function sendStateInfoTeam(attrib:attributes,data:ArrayList){
	attrib.team.changeStateTeam(gameObject,data);

}
function Update () {
	sendStateInfo();
	//for (i in new_seen.Values){
	//	Debug.DrawLine(transform.position,i.transform.position,Color.blue,1.0);
	//}
}
function sendStateInfo(){
	var attrib:attributes;
	if (alliesOnly == true){
		for (key in allies.Keys){
			attrib = allies[key].transform.parent.GetComponent("attributes");
			if (tagged_allies.ContainsKey(key)== false){
				if (withinDistance != 0.0){
					var d1:float = Vector3.Distance(transform.position,allies[key].transform.position);
					if (d1 < withinDistance){
						if(attrib.inTeam == false){
							allies[key].gameObject.BroadcastMessage("changeState",data);
						}else{
							sendStateInfoTeam(attrib,data);
						}
						tagged_allies[key] = allies[key];
					}
				}else{
				if(attrib.inTeam == false){
					allies[key].gameObject.BroadcastMessage("changeState",data);
				}else{
					sendStateInfoTeam(attrib,data);
				}
				tagged_allies[key] = allies[key];
				}

			}
		}


	}else if (enemiesOnly == true){
		for (key in enemies.Keys){
			attrib = enemies[key].transform.parent.GetComponent("attributes");
			if (tagged_enemies.ContainsKey(key)== false){

				if (withinDistance != 0.0){
					var d2:float = Vector3.Distance(transform.position,enemies[key].transform.position);
					if (d2 < withinDistance){
						if(attrib.inTeam == false){
							enemies[key].gameObject.BroadcastMessage("changeState",data);
						}else{
							sendStateInfoTeam(attrib,data);
						}
						tagged_enemies[key] = enemies[key];	
					}
				}else{
					if(attrib.inTeam == false){
						enemies[key].gameObject.BroadcastMessage("changeState",data);
					}else{
						sendStateInfoTeam(attrib,data);
					}
					tagged_enemies[key] = enemies[key];					
				}
			}
		}
	}else{
		for (key in seen.Keys){
			attrib = seen[key].transform.parent.GetComponent("attributes");
			if (tagged_seen.ContainsKey(key)== false){
				if (withinDistance != 0.0){
					var d3:float = Vector3.Distance(transform.position,seen[key].transform.position);
					if (d3 < withinDistance){
						if(attrib.inTeam == false){
							seen[key].gameObject.BroadcastMessage("changeState",data);							
						}else{
							sendStateInfoTeam(attrib,data);
						}
						tagged_seen[key] = seen[key];
					}
				}else{
					if(attrib.inTeam == false){
						seen[key].gameObject.BroadcastMessage("changeState",data);
					}else{
						sendStateInfoTeam(attrib,data);
					}
					tagged_seen[key] = seen[key];					
				}
			}
		}
	}
}

function poi_seen(data:Dictionary.<int,GameObject>){
	seen = data;
}
function poi_allies(data:Dictionary.<int,GameObject>){
	allies = data;
}
function poi_enemies(data:Dictionary.<int,GameObject>){
	enemies = data;
}

function ConstructBaseData():ArrayList{
	var list = new ArrayList();
	list.Add("");
	list.Add(Vector3.zero);
	list.Add("");
	list.Add(0.0);
	list.Add(new GameObject());
	list.Add(false);


	return list;
}