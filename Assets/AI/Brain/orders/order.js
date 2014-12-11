#pragma strict

var setupTactic:String;
var executeTactic:String;
var sucessTactic:String;
var failTactic:String;

var gameData:gameData;
var orderData:orderData;

function Start () {
	gameData = new gameData();
	gameData.Start();
	Invoke("setupUI",.05);
}

function Update () {

}

function execute(){

}

function setupUI(){
		gameObject.BroadcastMessage("UI_Set_Text",orderData.orderName);

}