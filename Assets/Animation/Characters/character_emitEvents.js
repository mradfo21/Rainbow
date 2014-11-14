#pragma strict

var hovering:boolean = false;
var transmitFrom:GameObject;
var gameData = new gameData();
var clock:float = 0.0;
var nextPress:float = 0.0;
var resetTime:float = .5;
var wasHovered:boolean = false;
var hoverTime:float = 0.0;
function Start () {
	transmitFrom = transform.parent.gameObject;
 	gameData = new gameData();
	gameData.Start();
}

function Update () {
	if (Input.GetButton("IssueOrder") && hovering == true && clock > nextPress && gameData.gameAttributes.inAction("Aim") == true){
		transmitFrom.BroadcastMessage("Marked");
		nextPress = clock + resetTime;

	}
	if (wasHovered == true && hovering == false && clock > hoverTime + 1.0){
		exitHovering();
	}
	clock+=Time.unscaledDeltaTime;

}
function enterHovering(){
	transmitFrom.BroadcastMessage("Targeted",SendMessageOptions.DontRequireReceiver);
	wasHovered = true;

}
function exitHovering(){
	transmitFrom.BroadcastMessage("UnTargeted",SendMessageOptions.DontRequireReceiver);	
	wasHovered = false;

}
function OnMouseEnter(){

	if (gameData.gameAttributes.inAction("Aim")== true){

		if (wasHovered == false){
			enterHovering();		
		}
		hovering = true;
		hoverTime = clock;
	}
}

function OnMouseExit(){
	hovering = false;
}

