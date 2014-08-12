#pragma strict

public class poi_data{
	var species:String;
	var origin:Vector3 = Vector3.zero;
	var pos:Vector3;
	var id:float;
	function Start () {
		id = Random.value * 10000000;
	}

	function Update () {

	}

}
