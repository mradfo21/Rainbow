#pragma strict

public class gameData{
	var Game:GameObject;
	var gameAttributes:gameAttributes;
	var teams:teams;
	var profileManager:profileManager;
	var cameraManager:cameraManager;
	var orderManager:orderManager;

	function Start () {
		Game = GameObject.Find("Game");
		gameAttributes = Game.GetComponent("gameAttributes") as gameAttributes;
		teams = Game.GetComponent("teams") as teams;
		profileManager =Game.GetComponent("profileManager") as profileManager;
		cameraManager =Game.GetComponent("cameraManager") as cameraManager;
		orderManager = Game.GetComponent("orderManager") as orderManager;
	}

	function Update () {
	}
}