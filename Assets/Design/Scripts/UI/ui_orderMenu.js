#pragma strict


var base:GameObject;
var gameData:gameData;
var canvas:Canvas;
var canvasObj:GameObject;
var font:Font;
var ui_icon:GameObject;
var baseMenu:GameObject;
var menuOpen:boolean = false;
var pMenu:String;
var cMenu:String;
var currentMenuItems:List.<GameObject> = new List.<GameObject>();
var UI:GameObject;
var UIbase:GameObject;
var currentOrderGroup:orders;
var currentOrderListing:List.<ui_icon> = new List.<ui_icon>();

function Start () {
	gameData = new gameData();
	gameData.Start();

	UI = gameData.gameAttributes.UI;
	UIbase =  UI.transform.Find("OrderMenu").gameObject;

	base = Instantiate(baseMenu);
	base.transform.parent = UIbase.transform;
	var rectTransform:RectTransform = base.GetComponent("RectTransform");
	rectTransform.anchoredPosition = Vector3.zero;
	//Invoke("resetBasePosition",1);
}

function resetBasePosition(){
	base.transform.position = Vector3(0,0,0);
}
function Update () {

}

function createIcon(text:String){
	print("making entry for: "+text);
	var buttonObj = Instantiate(ui_icon);
	buttonObj.transform.parent = base.transform;
	var icon:ui_icon = buttonObj.GetComponent("ui_icon");
	icon.setText(text);
	return icon;	
}
function createMenu(){
	currentOrderListing.Clear();
	var ordersMovement:List.<String> = currentOrderGroup.orders;
	for (var i = 0; i <ordersMovement.Count; i++){
		currentOrderListing.Add(createIcon(ordersMovement[i]));
	}
	Invoke("initOrder",.5);	
}
function openMenu(){
	UIbase.BroadcastMessage("OrderMenuOpen");
	Invoke("addIcons",.8);
	menuOpen = true;

}
function closeMenu(){
	UIbase.BroadcastMessage("OrderMenuClose");

}

function setupGroup(){
	if (cMenu!= pMenu){
		if (cMenu == "movement"){
			currentOrderGroup = gameData.gameAttributes.playerTeam.orders_movement;	
		}

		if (cMenu == "action"){
			currentOrderGroup = gameData.gameAttributes.playerTeam.orders_action;	
		}
	}
	pMenu = cMenu;	
}
function addIcons(){
	createMenu();
}
function buildMenu(type:String){
	cMenu = type;
	setupGroup();
	if (menuOpen == false){
		openMenu();
	}else{
		addIcons();
	}

}


function initOrder(){
	currentOrderListing[currentOrderGroup.orderIndex].gameObject.BroadcastMessage("Selected");
}
function switchOrder(dir:int){
	currentOrderListing[currentOrderGroup.orderIndex].gameObject.BroadcastMessage("Deselected");
	currentOrderGroup.orderIndex += dir;
	if (currentOrderGroup.orderIndex > currentOrderGroup.orders.Count-1){
		currentOrderGroup.orderIndex = 0;
	}
	if (currentOrderGroup.orderIndex < 0){
		currentOrderGroup.orderIndex = currentOrderGroup.orders.Count-1;
	}

	currentOrderListing[currentOrderGroup.orderIndex].gameObject.BroadcastMessage("Selected");
}