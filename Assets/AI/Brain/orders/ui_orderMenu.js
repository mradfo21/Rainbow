#pragma strict


private var base:GameObject;
private var gameData:gameData;
private var canvas:Canvas;
private var canvasObj:GameObject;
var ui_icon:GameObject;
var baseMenu:GameObject;
var menuOpen:boolean = false;
private var pMenu:String;
private var cMenu:String;
private var currentMenuItems:List.<GameObject> = new List.<GameObject>();
private var UIbase:GameObject;
private var UIbaseWS:GameObject;
private var currentOrderListing:List.<ui_icon> = new List.<ui_icon>();


function Start () {
	gameData = new gameData();
	gameData.Start();

	UIbase =  gameData.gameAttributes.UI.transform.Find("OrderMenu").gameObject;
	UIbaseWS =  gameData.gameAttributes.UI.transform.Find("OrderMenuWS").gameObject;

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
	var o:List.<String> = gameData.gameAttributes.currentOrderGroup.orders;
	for (var i = 0; i <o.Count; i++){
		currentOrderListing.Add(createIcon(o[i]));
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
			gameData.gameAttributes.currentOrderGroup = gameData.gameAttributes.playerTeam.orders_movement;	
		}

		if (cMenu == "action"){
			gameData.gameAttributes.currentOrderGroup = gameData.gameAttributes.playerTeam.orders_action;	
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