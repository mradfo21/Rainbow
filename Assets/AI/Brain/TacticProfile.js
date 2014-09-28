#pragma strict

var tacticNames = new List.<String>();
var tacticObjects = new List.<GameObject>();
var tactics = new Dictionary.<String,GameObject>();

var enemyContact:String;
var enemiesKilled:String;
var enemySighted:String;
var ambient:String;

function Start () {

}

function Update () {

}

function InjectTactics(obj:tactics){
	for (var i = 0; i <tacticNames.Count; i++){
		tactics[tacticNames[i]] = tacticObjects[i];
	}
	obj.tacticNames = tacticNames;
	obj.tacticObjects = tacticObjects;
	obj.tactics = tactics;

	obj.enemySighted = enemySighted;
	obj.enemiesKilled = enemiesKilled;
	obj.enemyContact = enemyContact;
	obj.ambient = ambient;
}