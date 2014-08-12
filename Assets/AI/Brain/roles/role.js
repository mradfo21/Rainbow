﻿#pragma strict

var entity:GameObject = null;
var attributes:attributes;

var lastExecutedStateNum = 0;
var currentStateNum:int = 0;
var maxStateNum:int = 0;
var states = new List.<String>();
var data:ArrayList = null;
var emitData:ArrayList;

var enemyContact:String;

function Start () {
	entity = transform.parent.transform.parent.gameObject;
	attributes = entity.GetComponent("attributes") as attributes;
	maxStateNum = states.Count;
	executeState();
}

function dead(t:float){
	RoleFinished(true);
}
function Update () {
}

function clearRoles(data:boolean){
	Destroy(gameObject);
}
function RoleFinished(blocking:boolean){
	if (transform.parent){
		attributes.team.BroadcastMessage("NeedsNewRole",transform.parent.gameObject,SendMessageOptions.RequireReceiver);		
		Destroy(gameObject);		
	}
		
}
function Contact(pd:poi_data){

}
function StateFinished(blocking:boolean){
	lastExecutedStateNum = currentStateNum;
	currentStateNum+=1;
	if (currentStateNum < maxStateNum && maxStateNum !=0){
		executeState();
	}else{
		RoleFinished(blocking);
	}
}
function executeState(){
	emitData = data;
	emitData[0] = states[currentStateNum];
	entity.BroadcastMessage("changeState",emitData);
}