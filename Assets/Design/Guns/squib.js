#pragma strict
var lifespan:float =.5;

private var age = 0.0;
private var normalizedAge =0.0;
private var hit:RaycastHit;

function Start () {

}

function Update () {
		age+=(1*Time.deltaTime);
		if (age>=lifespan){
			Destroy(gameObject);
		}
}

function Info (h:RaycastHit){
	hit = h;
	transform.rotation = Quaternion.LookRotation(hit.normal);
}