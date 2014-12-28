#pragma strict


private var baseObj:GameObject;
private var gameData:gameData;
private var canvas:Canvas;
private var canvasObj:GameObject;
var ui_icon:GameObject;
var baseMenu:GameObject;
var menuOpen:boolean = false;
private var pMenu:String;
private var cMenu:String;
private var currentMenuItems:List.<GameObject> = new List.<GameObject>();
private var UIbaseWS:GameObject;
private var currentOrderListing:List.<ui_icon> = new List.<ui_icon>();
var baseMenuOffset = Vector3.zero;
var pOrderGroup = new List.<String>();


function setup(){

}
function Start () {
	gameData = new gameData();
	gameData.Start();

	UIbaseWS =  gameData.orderManager.orderMenuWSobj;
	gameData.orderManager.orderMenu = this;
	baseObj = Instantiate(baseMenu);
	baseObj.transform.SetParent(gameObject.transform);
	var rectTransform:RectTransform = baseObj.GetComponent("RectTransform");
	rectTransform.anchoredPosition = Vector3.zero;

}

function Update () {
	baseObj.transform.localPosition = baseMenuOffset;

}


function createIcon(text:String){
	var buttonObj = Instantiate(ui_icon);
	buttonObj.transform.SetParent(baseObj.transform);
	buttonObj.transform.localRotation = Quaternion.EulerAngles(0,0,0);
	buttonObj.transform.localScale = Vector3(1,1,1);
	buttonObj.transform.localPosition = Vector3.zero;
	var icon:ui_icon = buttonObj.GetComponent("ui_icon");
	icon.setText(text);
	return icon;	
}
function differentOrderGroup():boolean{
	var o:List.<String> = gameData.gameAttributes.currentOrderGroup.orders;

	if (o.Count != pOrderGroup.Count){
		return true;
	} else if (o.Count == pOrderGroup.Count ){
		for (var i = 0; i <o.Count; i++){
			if (o[i]!= pOrderGroup[i]){
				return true;
			}
		}

	}
	pOrderGroup = o;
	print("this is a new, unique order group. switched teams?");
	return false;	
}

function openMenu(type:String){
	clearOldIcons();
	cMenu = type;
	setupGroup();
	if (menuOpen == false){
		gameObject.BroadcastMessage("OrderMenuOpen");
		Invoke("addIcons",.5);
		menuOpen = true;

	}else{
		//addIcons();
	}


}
function closeMenu(){
	gameObject.BroadcastMessage("OrderMenuClose");
	//for (order in currentOrderListing){
	//	Destroy(order);
	//}
	menuOpen = false;
}

function setupGroup(){
	if (cMenu!= pMenu){
		if (cMenu == "movement" || cMenu == "neutral"){
			gameData.gameAttributes.currentOrderGroup = gameData.gameAttributes.playerTeam.orders_movement;	
		}

		if (cMenu == "action"){
			gameData.gameAttributes.currentOrderGroup = gameData.gameAttributes.playerTeam.orders_action;	
		}
	}
	pMenu = cMenu;	
}
function clearOldIcons(){
	for (icon in currentOrderListing){
		Destroy(icon.gameObject);
	}
	currentOrderListing.Clear();
}
function addIcons(){
	var o:List.<String> = gameData.gameAttributes.currentOrderGroup.orders;
	for (var i = 0; i <o.Count; i++){
		currentOrderListing.Add(createIcon(o[i]));
	}

	Invoke("initOrder",.2);	
}


function initOrder(){
	currentOrderListing[gameData.gameAttributes.currentOrderGroup.orderIndex].gameObject.BroadcastMessage("Selected");
}
function switchOrder(dir:int){
	currentOrderListing[gameData.gameAttributes.currentOrderGroup.orderIndex].gameObject.BroadcastMessage("Deselected");
	gameData.gameAttributes.currentOrderGroup.orderIndex += dir;
	if (gameData.gameAttributes.currentOrderGroup.orderIndex > gameData.gameAttributes.currentOrderGroup.orders.Count-1){
		gameData.gameAttributes.currentOrderGroup.orderIndex = 0;
	}
	if (gameData.gameAttributes.currentOrderGroup.orderIndex < 0){
		gameData.gameAttributes.currentOrderGroup.orderIndex = gameData.gameAttributes.currentOrderGroup.orders.Count-1;
	}

	currentOrderListing[gameData.gameAttributes.currentOrderGroup.orderIndex].gameObject.BroadcastMessage("Selected");
}