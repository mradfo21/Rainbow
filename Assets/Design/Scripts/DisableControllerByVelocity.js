#pragma strict

var v:Vector3;
var vMag:float;
var velocityThreshold = 4.0;
var controller:CharacterController;
function Start () {
	controller = gameObject.GetComponent("CharacterController");
	StartCoroutine("CalcVelocity");
}

function Update () {
	vMag = controller.velocity.magnitude;
	if (vMag > velocityThreshold){
		controller.detectCollisions = false;
		print("disabling collisions");
	}else{
		controller.detectCollisions = true;
	}
}

function CalcVelocity():IEnumerator
{
  while( Application.isPlaying )
  {
    var pt:Vector3 = transform.position;
    yield new WaitForEndOfFrame();
    v = (pt - transform.position) * Time.deltaTime;
  }
}