#pragma strict

var data:poi_data;
var message:String;
var radius:float = 10;
function Start () {
}

function Update () {

}
function setup(inData:poi_data){
	data = inData;
	sendToColliders();
}
function sendToColliders(){
	var hitColliders = Physics.OverlapSphere(transform.position,radius);
	for (var i in hitColliders){
		i.BroadcastMessage(message,data,SendMessageOptions.DontRequireReceiver);
	}
}