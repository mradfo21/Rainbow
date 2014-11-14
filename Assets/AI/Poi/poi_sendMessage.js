#pragma strict

var data:poi_data;
var message:String;
var radius:float = 10;
var changeState:boolean = false;
var list:ArrayList = new ArrayList();
function Start () {
}

function Update () {

}
function setup(inData:poi_data){
	data = inData;
	list = ConstructBaseData();
	list[0] = message;
	list[1] = data.pos;
	list[4] = data.obj;
	if (data.team!= null){
		sendToTeam();
	}else{
		sendToColliders();		
	}
}
function sendToTeam(){
	if (changeState == true){
		data.team.gameObject.SendMessage("changeState",list);
	}else{
		data.team.gameObject.SendMessage(message,data);
	}

}
function sendToColliders(){

	var hitColliders = Physics.OverlapSphere(transform.position,radius);
	for (var i in hitColliders){
	if (changeState == true){
		i.BroadcastMessage("changeState",list);
	}else{
		i.BroadcastMessage(message,data,SendMessageOptions.DontRequireReceiver);		
	}
	}
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