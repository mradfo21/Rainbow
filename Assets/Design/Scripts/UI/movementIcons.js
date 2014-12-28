#pragma strict
var gameData:gameData;
var icon:GameObject;
var icons:List.<GameObject>;
var origin:Vector3;

var lastTeamCount:int;
var currentTeamCount:int;
var team:team;
var teamPoints:List.<Vector3>;
var randomOffsets:List.<Vector3>;

var activated:boolean = false;

var offset:Vector3 = Vector3.zero;



function Start () {
	gameData = new gameData();
	gameData.Start();
	lastTeamCount = 0;
	currentTeamCount = 0;
	gameData.orderManager.movementIcons = this;
	resetPos();

}
function EnterMovement(){
	updateRandomOffsets();
}
function currentIcon(obj:GameObject){
	icon = obj;
}
function updateRandomOffsets(){
	if (randomOffsets.Count > 0){
		randomOffsets.Clear();		
	}
	for (var i =0; i < 300; i++){
		randomOffsets.Add(Random.insideUnitSphere);
	}
}
function select(){
	for ( i in icons){
		i.BroadcastMessage("Selected");
	}
}

function deselect(){
	for ( i in icons){
		i.BroadcastMessage("Deselected");
	}
}
function resetPosActual(){
	var basePosition = gameData.gameAttributes.playerTeam.leader.transform.position;
	origin = basePosition + gameData.cameraManager.cam.transform.forward*2;	
	offset = Vector3.zero;
}
function resetPos(){
	deselect();
	Invoke("resetPosActual",.2);
	Invoke("select",.5);

}
function clone(parent:GameObject){
	for (point in teamPoints){
		var obj:GameObject = Instantiate(icon,point,Quaternion.identity);
		obj.transform.SetParent(parent.transform);
		obj.BroadcastMessage("Selected");
	}
}

function resetColorsOnPoints(){
	gameObject.BroadcastMessage("Reset");
}
function updateOrigin(){
	var layerMask = 1 << 12;
	var ray : Ray = Camera.main.ViewportPointToRay (Vector3(0.5,0.5,0));
	var hit : RaycastHit;
	var point:Vector3;
	var navHit:NavMeshHit;
	if (Physics.Raycast (ray, hit,500,layerMask)){
		origin = hit.point;
	}
	var movementDirection = gameData.gameAttributes.playerTeam.leader.transform.position;
	movementDirection.y = 0;
	var camDirection = gameData.cameraManager.cam.transform.position;
	camDirection.y = 0;

	movementDirection = (camDirection - movementDirection).normalized;

	var playerOffset:Vector3;
	playerOffset.x = Input.GetAxis("NavHorizontal") * .5;
	playerOffset.z = (Input.GetAxis("NavVertical")*-1) * .5;
	offset+= playerOffset;
	
	var sideDirection = gameData.cameraManager.cam.transform.right;
	sideDirection.y = 0;
	sideDirection *= offset.z; 
	movementDirection*= offset.x;
	var basePosition = gameData.gameAttributes.playerTeam.leader.transform.position + gameData.cameraManager.cam.transform.forward*2;
	var finalOffset = movementDirection + sideDirection;
	origin = basePosition + finalOffset;	
}
function monitorForNewTeam(){
	currentTeamCount = team.members.Count;
	if (currentTeamCount != lastTeamCount){
		newTeam();
	}
	lastTeamCount = team.members.Count;
}
function Update () {
	team = gameData.gameAttributes.playerTeam;
	if (team){
		if (gameData.gameAttributes.inAction("Neutral") == true){
			updateOrigin();
			monitorForNewTeam();
			FindTeamPoints();
			updateIconPositions();			
		}
		gameData.orderManager.movement_positions = teamPoints;
	}
}
function newTeam(){
	initializeIcons();
	updateRandomOffsets();
}
function setIcons(point:Vector3){
	for (var i =0; i < teamPoints.Count;i++){
		icons[i].transform.position = FindNewPoint(point);
	}
}
function updateIconPositions(){
	for (var i =0; i < teamPoints.Count;i++){
		icons[i].transform.position = teamPoints[i];

	}	
}

function initializeIcons(){
	for (ic in icons){
		Destroy(ic);
	}
	icons.Clear();

	for (member in team.members){
		var obj:GameObject = Instantiate(icon);
		obj.transform.parent = gameObject.transform;
		icons.Add(obj);
	}
}

function FindNewPoint(origin:Vector3):Vector3{
	var point:Vector3;
	var navHit:NavMeshHit;
	var edgeRadius:float = 2.5;
	var samplePos:Vector3;
	NavMesh.SamplePosition(origin,navHit,200,-1);
	samplePos = navHit.position;
	point = samplePos;
	if(NavMesh.FindClosestEdge(samplePos,navHit,-1)){
		if (Vector3.Distance(origin, navHit.position) < edgeRadius){
			point = navHit.position;
		}
	};

	return point;
}

function FindTeamPoints(){
	teamPoints.Clear();
	for (var i =0; i < team.members.Count;i++){
		teamPoints.Add(FindUniquePoint(team.members[i],i,teamPoints,team));
	}
}
function isPointOccupied(point:Vector3,points:List.<Vector3>,radius:float){
	for (p in points){
		if (Vector3.Distance(point,p) < radius){
			return true;
		}
	}
	return false;
}
function getFormationPoint(origin:Vector3,index:int,radius:float){
	var offset = Vector3(Mathf.Cos(index),0,Mathf.Sin(index));
	var newPoint:Vector3 = FindNewPoint(origin+offset)+ randomOffsets[index]; 
	return newPoint;
}
function FindUniquePoint(member:GameObject,index:int,points:List.<Vector3>,team:team):Vector3{
	var found = false;
	var tries:int = 0;
	var uniquePoint:Vector3;
	var newOffsetIndex = 10+index;
	var newOffset:Vector3 = Vector3.zero;
	var newOffsetRadius:float = 7;
	var maxtries:int = 20;
	while (tries < maxtries){
		var testPoint:Vector3 =FindNewPoint(getFormationPoint(origin,index,team.members.Count)+newOffset);
		if (isPointOccupied(testPoint,teamPoints,1) == false){
			uniquePoint = testPoint;
			tries = maxtries;
		}else{
			newOffset = randomOffsets[newOffsetIndex]*newOffsetRadius;
			newOffsetIndex+=1;
		}
		tries+=1;
	}

	return uniquePoint;
}