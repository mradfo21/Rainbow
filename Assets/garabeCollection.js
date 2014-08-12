#pragma strict

function Start () {

}

function Update () {
	if (Time.frameCount % 90 == 0)
	{
   		System.GC.Collect();
	}
}