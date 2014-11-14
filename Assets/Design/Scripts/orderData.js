#pragma strict

public class orderData{

	var position:Vector3;
	var team:team;
	var targets:List.<GameObject> = new List.<GameObject>();
	var order:String;
	var code:int;
	var obj:GameObject;
	var id:int;
	var list:ArrayList = new ArrayList();

	function Setup(inOrder:String,inCode:int){
		order = inOrder;
		code = inCode;
		id = Random.value * 10000000;
	}


	function Execute(){
		print("executing order");
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