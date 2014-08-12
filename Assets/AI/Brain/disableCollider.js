#pragma strict
// this component is necesary unfortunately.
// it delays the activation of the vision collider because 1 frame needs to pass for all the species data
// to be set up correctly
var col:Collider;
var rigid:Rigidbody;
var startupWait:float = 2.0;
private var done = false;
private var t:float = 0;
function Start () {
	done = false;
	col = gameObject.GetComponent("Collider");
	rigid = gameObject.GetComponent("Rigidbody");
	col.enabled = false;
}

function Update () {
	if (done != true){
		t+=1.0*Time.deltaTime;
		if (t >=startupWait){
			col.enabled = true;
			rigid.AddForce(Vector3(0,.000001,0),ForceMode.Impulse);
			done = true;
			gameObject.SendMessage("setup",true,SendMessageOptions.DontRequireReceiver);
		}
	}
}