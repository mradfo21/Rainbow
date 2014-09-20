#pragma strict


var hasDied:boolean = false; 
var alive:boolean = true;
var health:float = 100;
var leader:boolean = false;
var inTeam:boolean = false;
var team:team;
var teammateTarget:GameObject;
var teammateTargetAttributes:attributes;
var teamSpot:int;
var brain:GameObject;
var acceleration:float = 1;
var angularSpeed:float = 20;
var speed:float = 2.5;
var stoppingDistance:float = 1;

var hint:boolean = false;
var lastHint:Vector3 = Vector3.zero;
var lastHintTimerMax:float = 10.0;
var lastHintTimer:float = lastHintTimerMax;

var contact:boolean = false;
var lastContact:Vector3 = Vector3.zero;
var lastContactTimerMax:float = 100.0;
var lastContactTimer:float = lastContactTimerMax;


var readyToFire:boolean = false;
var stance:String;
var combat:String;
var goal:String;
var movement:String;

var destination:Vector3;

var coverTarget:Vector3 = Vector3.zero;
var coveringFire:boolean = false;

var visionRange_spotted:float = 20.0;
var visionRange_attacked:float = 10.0;
var visionRange:float = 14.0;
var follower:GameObject = null;
var nearestFriend:GameObject;
var friendlies = new List.<GameObject>();

var agent:NavMeshAgent;
var hasTarget:boolean = false;

var gun:gun;
var species:String;
var targetDistance:float;
var accuracy:float = 1.0;
var damageMod:float = 1.0;
var stealthiness:float = 1.0;
private var currentTargetID;

var target:GameObject = null;
var targetAttributes:attributes;
var targets = new List.<GameObject>();

var assaignedTarget:GameObject = null;

function Start () {
	lastHintTimerMax = 40+Random.value*40;
	lastContactTimerMax = 100+ Random.value*100;
	target = null;
	agent = gameObject.GetComponent("NavMeshAgent");
}

function stop(){
	print("stopping agent");
	agent.Stop();
}
function walk(){
	speed = (Random.value * .5)+ 1.3;
}
function jog(){
	speed = (Random.value * .5)+ 1.5;
}
function run(){
	speed = 3;
}
function sprint(){
	speed = 4.4;
}

function newTarget(){
	//print("found a new target");
}
function Hint(pos:Vector3){
	hint = true;
	lastHint = pos;
	lastHintTimer = lastHintTimerMax;
	//print("attributes received a hint");
}

function Contact(pd:poi_data){
	contact = true;
	lastContact = pd.origin;
	lastContactTimer = lastContactTimerMax;
	coverTarget = pd.origin;
	//print("attributes received a contact");
}
function Update () {

	lastContactTimer-= Time.deltaTime;
	lastHintTimer -= Time.deltaTime;
	if (lastHintTimer <= 0){
		hint = false;
	}
	if (lastContactTimer <=0){
		contact = false;
	}
	if (target != null){
		if(targets.Contains(target) == false){
			targets.Add(target);
			newTarget();

		}
		targetAttributes = target.gameObject.transform.parent.gameObject.GetComponent("attributes");
		if (targetAttributes.alive == false){
			target = null;
			targetAttributes = null;
		}else{
			targetDistance = Vector3.Distance(transform.position,target.transform.position);			
		}
	}
	if (agent){
		agent.acceleration = acceleration;
		agent.angularSpeed = angularSpeed;
		agent.speed = speed;
		agent.stoppingDistance = stoppingDistance;
	}
	if (health <0){
		alive = false;
		if (hasDied == false){
			Died();
		}
		hasDied = true;
		health = 0;
		gameObject.BroadcastMessage("changeState","movement_dead");

	}
}


function Died(){
	gameObject.BroadcastMessage("dead",Time.time);

}

function Attacked(dmg:float){
	health -= dmg;
}

