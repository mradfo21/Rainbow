#pragma strict

var lifespan:float =.005;
private var endPosition:Vector3;
private var startPosition:Vector3;
var squib_default:GameObject;
var squib_ground:GameObject;
var squib_character:GameObject;

private var hit:RaycastHit;
private var age = 0.0;
private var normalizedAge =0.0;
private var beginClock = false;
function Start () {
	endPosition = transform.position;
	lifespan+= Random.Range(.001,.005) * Time.deltaTime;

}

function Update () {
	if (beginClock == true){
		transform.position = Vector3.Lerp(startPosition,endPosition,normalizedAge);
		transform.LookAt(startPosition,transform.right);
		age+=(1*Time.deltaTime);
		normalizedAge = age/lifespan;
		if (age>=lifespan){
			SpawnSquib(hit);
			Destroy(gameObject);
		}

	}

}

function SpawnSquib(hit:RaycastHit){
	if (hit.point == null){

	}else{
		var s:GameObject = Instantiate(squib_default,endPosition,Quaternion.identity);
		s.SendMessage("Info",hit);		
	}

}

function Info(h:RaycastHit){
	hit = h;
}
function Fired (from:GameObject){
	startPosition = from.transform.position;
	beginClock = true;
}