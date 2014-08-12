#pragma strict
// this component gets pinged by the vision module with "spotted"
// it then returns a ping "recieve_ping" back to vision
// it has this unfortunately problem of needing 1 frame to receive the species data from above
// i had to disable the vision collider for 1 frame as a consequence
var description:String;
var species:String;
var sendParent:boolean = false;
private var data = new ArrayList();

function Start () {
	data.Add(description);
	if (sendParent == true){
		data.Add(transform.parent.gameObject);
	}else{
		data.Add(gameObject);		
	}
	data.Add(species);
}

function Update () {
	data[2] = species;
}

function spotted(from:GameObject){
		send_ping(from);		
}

function send_ping(to:GameObject){
	to.BroadcastMessage("receive_ping",data,SendMessageOptions.DontRequireReceiver);
}
function SetSpecies(s:String){
	species = s;
}
function dead(time:float){
	this.enabled = false;
}