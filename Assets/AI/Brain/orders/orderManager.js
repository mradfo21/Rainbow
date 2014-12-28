#pragma strict

private var gameData:gameData;

var teamCodes = new Dictionary.<String, Dictionary.<int,GameObject> >();
var orderDisplays = new Dictionary.<String, Dictionary.<int,GameObject > >();

var orderMenuobj:GameObject;
var orderMenu:ui_orderMenu;
var orderMenuWSobj:GameObject;
var OrderDisplayElement:GameObject;
var movementIcons:movementIcons;
var movement_center:Vector3;
var movement_positions:List.<Vector3>;

function Start () {
	gameData = new gameData();
	gameData.Start();

	orderMenuobj = gameObject.Find("OrderMenu");	
	orderMenuWSobj = gameObject.Find("OrderMenuWS");}

function Update () {

}

function setup_execute(codeNumber:int){
	var teamName:String = gameData.gameAttributes.playerTeam.name;
	if (teamCodes.ContainsKey(teamName)){
		if (teamCodes[teamName].ContainsKey(codeNumber)){
			executeOrder(teamName,codeNumber);
		}
	}
}

function setup_set(codeNumber:int){
	// in action
	var position:Vector3 = movement_center;
	var teamName:String = gameData.gameAttributes.playerTeam.name;
	// delete old object if it exists
	if (!teamCodes.ContainsKey(teamName)){
		teamCodes[teamName] = new Dictionary.<int,GameObject>();	
	}else{
		if (teamCodes[teamName].ContainsKey(codeNumber)){
			if (teamCodes[teamName][codeNumber]){
				Destroy(teamCodes[teamName][codeNumber]);
			}
		}
		
	}
	// find which order we're currently going to place
	var orderName:String = gameData.gameAttributes.currentOrderGroup.orders[gameData.gameAttributes.currentOrderGroup.orderIndex];
	var orderObj:GameObject = gameData.gameAttributes.currentOrderGroup.ordersObj[gameData.gameAttributes.currentOrderGroup.orderIndex];
	var WSobj = Instantiate(orderObj,position,Quaternion.identity);
	WSobj.transform.set_parent(gameData.gameAttributes.GuiWS.transform);
	teamCodes[teamName][codeNumber] = WSobj;

	// now find the order thats attacthed to that gameobject
	var orderOnWSobj:order =  WSobj.GetComponent(order);
	// set its order data with the info we create

	var orderData:orderData = new orderData();
	// place where you add data to be passed into the order
	// TARGETS
	// VIEWING DIRECTION
	// POSITION OF PLAYER
	// OBJECT HOVERED
	// CHARACTER HOVERED
	orderData.movement_positions = movement_positions;
	orderData.useMovement_positions = true;
	orderData.Setup(gameData.gameAttributes.player,position,orderName,gameData.gameAttributes.playerTeam);
	orderOnWSobj.orderData = orderData;
	movementIcons.clone(WSobj);
	if (codeNumber <1){
		print("EXECUTING ORDER IMMEDIATELY");
		WSobj.BroadcastMessage("Execute");
	}else{
		WSobj.BroadcastMessage("Selected");
	}
}

function cacheMovement(){
	var list = new List.<Vector3>();
	for (pos in movementIcons.teamPoints){
		list.Add(pos);
	}
	movement_center = movementIcons.teamPoints[0];
	movement_positions = list;
}
function setOrder(number:int){
	cacheMovement();
	setup_set(number);
	if (number <= 1){
		Invoke("execute_immediate",.2);
	}
}

function executeOrder(number:int){
	setup_execute(number);
}

function execute_immediate(){
	setup_execute(1);
}

function constructOrderDisplay(teamName:String,codeName:int,orderName:String,orderObj:GameObject,point:Vector3){
	// move this code into the order itself
	var pos:Vector3 = point;
	if (!orderDisplays.ContainsKey(teamName)){
		orderDisplays[teamName] = new Dictionary.<int,GameObject>();
	}
	if (!orderDisplays[teamName].ContainsKey(codeName)){

	}else{
		Destroy(orderDisplays[teamName][codeName]);
	}
	orderDisplays[teamName][codeName]= Instantiate(OrderDisplayElement,pos,Quaternion.identity);
	orderDisplays[teamName][codeName].transform.parent = orderMenuWSobj.transform;
	pos.y+=1;
	orderDisplays[teamName][codeName].transform.position = pos;
	var textObj:GameObject = orderDisplays[teamName][codeName].transform.Find("Text").gameObject;
	var currentOrderDisplayText:UI.Text = textObj.GetComponent("Text");
	currentOrderDisplayText.text = orderName;
}

function executeOrder(teamName:String,codeNumber:int){
	if (codeNumber > 1.0){
		for ( tn in teamCodes.Keys){
			var o:GameObject = teamCodes[tn][codeNumber];
			o.BroadcastMessage("Deselected");
			o.BroadcastMessage("Execute");
		}
	}else{
		var j:GameObject = teamCodes[teamName][codeNumber];
		j.BroadcastMessage("Deselected");
		j.BroadcastMessage("Execute");
	}

}

function setCode(teamName:String,codeName:int,orderName:String,orderObj:GameObject,position:Vector3){
	constructOrderDisplay(teamName,codeName,orderName,orderObj,position);

}