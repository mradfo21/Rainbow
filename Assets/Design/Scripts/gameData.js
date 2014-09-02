#pragma strict

public class gameData{
	var Game:GameObject;
	var gameAttributes:gameAttributes;
	var teams:teams;
	function Start () {
		Game = GameObject.Find("Game");
		gameAttributes = Game.GetComponent("gameAttributes");
		teams = Game.GetComponent("teams");
	}

	function Update () {
	}
}