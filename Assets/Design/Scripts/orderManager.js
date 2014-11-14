#pragma strict

var teamCodes = new Dictionary.<String, Dictionary.<int,orderData> >();
var orderMenu:ui_orderMenu;

function Start () {
	orderMenu = GameObject.Find("OrderMenu").GetComponent("ui_orderMenu");
}

function Update () {
}

function setCode(teamName:String,codeName:int,order:String){
	if (!teamCodes.ContainsKey(teamName)){
		teamCodes[teamName] = new Dictionary.<int,orderData>();
	}
	var o = new orderData();
	o.Setup(order,codeName);
	teamCodes[teamName][codeName] = o;	
}

function getOrder(teamName:String,codeName:int):orderData{
	if (teamCodes[teamName][codeName]){
		return teamCodes[teamName][codeName];
	}else{
		return null;
	}
}

