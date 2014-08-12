#pragma strict
var attributes:attributes;
var alive:boolean = true;
var hasDied:boolean = false;
var animator:Animator;
var speedX:float;
var speedZ:float;
var shotweapon:boolean = false;
var inverse:boolean = false;
var pint:boolean = false;
var agent:NavMeshAgent;
function Start () {
	animator = gameObject.GetComponent("Animator");
	attributes = transform.parent.gameObject.GetComponent("attributes") as attributes;
	agent = attributes.agent;
}

function Update () {

	speedX = agent.velocity.magnitude * (Vector3.Dot(transform.forward,agent.velocity.normalized));
	speedZ = agent.velocity.magnitude * (Vector3.Dot(transform.right,agent.velocity.normalized));
	if (pint == true){
		var angle :float = Vector3.Angle(transform.forward, agent.velocity);
		angle*= Mathf.Deg2Rad;
		print(angle);
	}
	animator.SetFloat("speedX",speedX);
	animator.SetFloat("speedZ",speedZ);
	//animator.SetBool("shotweapon",shotweapon);
	shotweapon = false;
}
function dead(time:float){

	alive = false;
	if (hasDied == false){
		hasDied = true;
		animator.SetBool("dead",true);
	}
}
function ShotWeapon(){
	shotweapon = true;
}
