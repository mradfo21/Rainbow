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
var currentStance:int =2;
var previousStance:int= 1;

var stanceNum:int;
var previousStanceNum:int;
function Start () {

}

function Update () {

	animator = gameObject.GetComponent("Animator");
	attributes = transform.parent.transform.parent.transform.parent.gameObject.GetComponent("attributes") as attributes;
	attributes.animator = animator;
	agent = attributes.agent;
	MonitorStance();
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

//function DetermineStance(stanceNum:int){
//	previousStance = currentStance;
//	currentStance = stanceNum;
//	if (stanceNum == 0){
//		animator.SetBool("prone",true);
//		if (previousStance == 1){
//			animator.SetBool("crouch",false);
//		}
//	}
//	if (stanceNum == 1 ){
//		animator.SetBool("crouch",true);
//		if (previousStance == 0){
//			animator.SetBool("prone",false);
//		}
//		if (previousStance == 2){
//			animator.SetBool("stand",false);
//		}
//	}
//	if (stanceNum == 2){
//		animator.SetBool("stand",true);
//		if (previousStance == 1){
//			animator.SetBool("crouch",false);
//		}
//	}
//}


function MonitorStance(){
	//currentStance = attributes.stanceNum;
	if (stanceNum != previousStanceNum){
//		DetermineStance(currentStance);
	}
	previousStanceNum = currentStance;
}

