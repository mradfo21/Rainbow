#pragma strict

public class gameData{
	var Game:GameObject;
	var gameAttributes:gameAttributes;
	var teams:teams;
	var profileManager:profileManager;
	var cameraManager:cameraManager;

	function Start () {
		Game = GameObject.Find("Game");
		gameAttributes = Game.GetComponent("gameAttributes");
		teams = Game.GetComponent("teams");
		profileManager =Game.GetComponent("profileManager");
		cameraManager =Game.GetComponent("cameraManager");

	}

	function Update () {
	}
}