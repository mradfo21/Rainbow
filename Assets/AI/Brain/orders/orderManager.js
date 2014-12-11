#pragma strict

private var gameData:gameData;

var teamCodes = new Dictionary.<String, Dictionary.<int,GameObject> >();
var orderDisplays = new Dictionary.<String, Dictionary.<int,GameObject > >();

var orderMenu:ui_orderMenu;
var orderMenuWS:GameObject;
var OrderDisplayElement:GameObject;


function Start () {
	gameData = new gameData();
	gameData.Start();

	orderMenu = GameObject.Find("OrderMenu").GetComponent("ui_orderMenu");
	orderMenuWS =  gameData.gameAttributes.UI.transform.Find("OrderMenuWS").gameObject;
}

function Update () {
}

function executeOrder(){
	
}
function setup_set(codeNumber:int){
	// in action
	var position:Vector3 = utils.getPositionScreen().point;


	var teamName:String = gameData.gameAttributes.playerTeam.name;
	// delete old object if it exists
	if (!teamCodes.ContainsKey(teamName)){
		//if (teamCodes[teamName][codeNumber]){
		//	Destroy(teamCodes[teamName][codeNumber]);
		//}
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

	orderData.Setup(gameData.gameAttributes.player,position,orderName);
	orderOnWSobj.orderData = orderData;

	//if (gameData.gameAttributes.inAction("actionNeutral")){
		//if (position != Vector3.zero){
		//	executeOrder(gameData.gameAttributes.playerTeam.name,codeNumber,orderName,position);
		//}		

//	}else if (gameData.gameAttributes.inAction("actionMovement")){

		//if (position != Vector3.zero){
		//setCode(gameData.gameAttributes.playerTeam.name,codeNumber,orderName,orderObj,position);
		//}
	
//	}else if(gameData.gameAttributes.inAction("actionAim")){

		
//	}else{
//		print("this action is not supported");
//	}
		


}
function set_one(){
	setup_set(1);
}
function set_two(){
	setup_set(2);
}
function set_three(){
	setup_set(3);
}
function set_four(){
	setup_set(4);
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
	orderDisplays[teamName][codeName].transform.parent = orderMenuWS.transform;
	pos.y+=1;
	orderDisplays[teamName][codeName].transform.position = pos;
	var textObj:GameObject = orderDisplays[teamName][codeName].transform.Find("Text").gameObject;
	var currentOrderDisplayText:UI.Text = textObj.GetComponent("Text");
	currentOrderDisplayText.text = orderName;
}

function executeOrder(teamName:String,codeName:int,order:String,position:Vector3){

}
function setCode(teamName:String,codeName:int,orderName:String,orderObj:GameObject,position:Vector3){
	constructOrderDisplay(teamName,codeName,orderName,orderObj,position);

}

















