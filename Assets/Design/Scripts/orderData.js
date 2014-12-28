#pragma strict

public class orderData{

	var active:boolean = false;
	var leader:GameObject;
	var position:Vector3;
	var team:team;
	var targets:List.<GameObject> = new List.<GameObject>();
	var code:int;
	var obj:GameObject;
	var id:int;
	var list:ArrayList = new ArrayList();
	var orderName:String = "an empty order";
	var movement_positions = new List.<Vector3>();
	var useMovement_positions:boolean = false;
	//var teamPoints:
	function Setup(lead:GameObject,pos:Vector3,orderNameIN:String,t:team){
		id = Random.value * 10000000;
		leader = lead;
		position = pos;
		orderName = orderNameIN;
		team =  t;

	}


	function Execute(){
		active = true;
		sendToTeam();
	}

function sendToTeam(){
	list = ConstructBaseData();
	list[8] = this;
	team.gameObject.SendMessage("changeState",list);
}


function ConstructBaseData():ArrayList{
	list.Add("");
	list.Add(Vector3.zero);
	list.Add("");
	list.Add(0.0);
	list.Add(new GameObject());
	list.Add(false);
	list.Add(new poi_data());
	list.Add(new orderData());

	return list;
}


}