#pragma strict

class orders extends UnityEngine.MonoBehaviour{

var orderIndex:int = 0;
var orders = new List.<String>();
var ordersObj = new List.<GameObject>();

var currentOrder:String;


function Start () {

}

function Update () {
	if (orderIndex < orders.Count){
	currentOrder = orders[orderIndex];
	}
}

function changeOrderIndex(newIndex:int){
	orderIndex = newIndex;
	if (orderIndex > orders.Count){
		orderIndex = 0;
	}
	if (orderIndex < 0){
		orderIndex = orders.Count-1;
	}
}

}
