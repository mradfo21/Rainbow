#pragma strict

var mapIcon:List.<GameObject>;
var mapString:List.<String>;
var mapDictionary = new Dictionary.<String,GameObject>();
var currentIcon:GameObject;

function Start () {
	for (var i =0; i < mapIcon.Count; i++){
		mapDictionary[mapString[i]] = mapIcon[i];
		print( mapIcon[i]);
	}

	currentIcon = GetIcon(mapString[0]);
}

function Update () {
	transmitIcon();
}

function GetIcon(iconName:String):GameObject{
	return mapDictionary[iconName];

}

function transmitIcon(){
	gameObject.BroadcastMessage("currentIcon",currentIcon);
}