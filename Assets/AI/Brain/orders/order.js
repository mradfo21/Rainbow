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
	orderData.active = true;
}

function Update () {

}

function Setup(){
	if (setupTactic != ""){
		utils.sendTactic(setupTactic,orderData);	
	}
	}
function Execute(){
		utils.sendTactic(executeTactic,orderData);
}

function Sucess(){
	if (sucessTactic != ""){
		utils.sendTactic(sucessTactic,orderData);
	}	

}
function setupUI(){

		gameObject.BroadcastMessage("UI_Set_Text",orderData.orderName);

}

