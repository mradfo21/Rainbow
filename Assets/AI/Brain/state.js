#pragma strict
var navMesh:NavMesh = null;
var attributes:attributes;
var id:String;
var data:ArrayList = null;
var argVector:Vector3;
var argString:String;
var argFloat:float;
var argBoolean:boolean = false;
var argGameObject:GameObject;
var agent:NavMeshAgent;
var debug:boolean;
var useGameObject:boolean = false;
var relativePoint:Vector3 = Vector3.zero;
var blocking:boolean = true;
var poi_data:poi_data = null;
function NavMesh(nav:NavMesh){
	navMesh = nav;
}

function Awake(){
}

function Start () {
}

function Update () {
}



function Enter(){
	attributes = gameObject.transform.parent.GetComponent("attributes");
	agent = attributes.agent;
	if (data!= null){
			argVector = data[1];		
			argString = data[2];		
			argFloat = data[3];		
			argGameObject = data[4];
			argBoolean = data[5];
			poi_data = data[6];		
	}
	if (argBoolean == true){
		useGameObject = true;
	}
}

function Execute(){
}

function Exit(){
	StopAllCoroutines();
	Destroy(this);
}
function dead(t:float){
	finished();
}

function finished(){
	gameObject.BroadcastMessage("StateFinished",blocking,SendMessageOptions.DontRequireReceiver);
	Exit();		
}
function softFinish(){
	gameObject.BroadcastMessage("StateFinished",blocking,SendMessageOptions.DontRequireReceiver);
}

function ConstructBaseData():ArrayList{
	// ok so this handles the switching. the important thing to remember here is the dead of 
	// data being in an arrayList
	// spot 0 is state name
	// spot 1 is argVector
	// spot 2 is argString
	// spot 3 is argFloat
	// spot 4 is argGameObject
	// spot 5 is argBoolean
	var list = new ArrayList();
	list.Add("");
	list.Add(Vector3.zero);
	list.Add("");
	list.Add(0.0);
	list.Add(GameObject());
	list.Add(false);
	list.Add(new poi_data());


	return list;
}