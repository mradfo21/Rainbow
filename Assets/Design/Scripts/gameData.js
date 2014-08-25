#pragma strict

public class gameData{
	var Game:GameObject;
	var gameAttributes:gameAttributes;

	function Start () {
		Game = GameObject.Find("Game");
		gameAttributes = Game.GetComponent("gameAttributes");
	}

	function Update () {
	}
}