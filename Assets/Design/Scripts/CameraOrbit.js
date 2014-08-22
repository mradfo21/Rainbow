#pragma strict

// this class controls rotating around the character as he moves
// it has noise to recreate camera shake
var distance = 5.0;
var height = 1.1;

var xSpeed = 250.0;
var ySpeed = 120.0;
 
var yMinLimit = -200;
var yMaxLimit = 800;
var controller:CharacterController;
var v:Vector3;
var vmag:float;
var vFactor:float;
var disabled:boolean = false;
private var x = 0.0;
private var y = 0.0;
 
 
var smoothTime = 0.3;
 
private var xSmooth = 0.0;
private var ySmooth = 0.0; 
private var xVelocity = 0.0;
private var yVelocity = 0.0;
 
private var posSmooth = Vector3.zero;
private var posVelocity = Vector3.zero;
 
var offset:Vector3;

var gameData:gameData;
var goal:Vector3;
private var goalOffsetForward:Vector3;

function Start () {
    var angles = transform.eulerAngles;
    x = angles.y;
    y = angles.x;
 
	gameData = new gameData();
	gameData.Start();
    StartCoroutine("CalcVelocity");
    controller = gameObject.GetComponent("CharacterController");
}

function collisionTest(goal:Vector3):Vector3{

        var layerMask = 1 << 12;        
        var hit:RaycastHit;
        var dirToGoal:Vector3 = (transform.position - goal).normalized;
        var distanceToGoal:float = Vector3.Distance(transform.position,goal);
        var avoidanceForce:Vector3 = Vector3.zero;
        if (Physics.Raycast(goal,dirToGoal,hit,distanceToGoal,layerMask)){
            Debug.DrawLine(goal,hit.point);
            avoidanceForce =  hit.point - transform.position;
        }
        return avoidanceForce;    
}
function Update () {

    vmag = v.magnitude;

    if (gameData.gameAttributes.player) {

        var agent:NavMeshAgent = gameData.gameAttributes.playerAttributes.agent;
        vFactor += Mathf.Clamp(agent.desiredVelocity.magnitude*.1,0,1) * Time.deltaTime;
        vFactor -= (vFactor/1.01) * Time.deltaTime;

		goal = gameData.gameAttributes.player.transform.position + (agent.velocity * vFactor);

		goal.y += height;


        x += Input.GetAxis("Mouse X") * xSpeed * 0.01;
        y -= Input.GetAxis("Mouse Y") * ySpeed * 0.01;
        

        xSmooth = Mathf.SmoothDamp(xSmooth, x, xVelocity, smoothTime);
        ySmooth = Mathf.SmoothDamp(ySmooth, y, yVelocity, smoothTime);
        ySmooth = ClampAngle(ySmooth, yMinLimit, yMaxLimit);
 
        var rotation = Quaternion.Euler(ySmooth, xSmooth, 0);
       	posSmooth = Vector3.SmoothDamp(posSmooth,goal,posVelocity,smoothTime);

        var finalDistance = 1.13+(distance*vFactor);
        transform.position = (rotation * Vector3(0.0, 0.0, - finalDistance) + posSmooth);
        transform.rotation = rotation;
        transform.position+= collisionTest(goal);
        //transform.position += (avoidanceForce * Time.deltaTime);

        //var finalPosition:Vector3 = rotation * Vector3(0.0, 0.0, - distance) + posSmooth;
        //var force:Vector3 = finalPosition - transform.position;
       // if (vmag > .02 ){
        //    disable();          
        //}
        //if ( Vector3.Distance(transform.position, gameData.gameAttributes.player.transform.position) > distance*2){
         //   disable();
        //}
        //if (disabled == true){
         //   transform.position = rotation * Vector3(0.0, 0.0, - distance) + posSmooth;
          //  controller.enabled = false;            
        //}else{
          //  controller.Move(force);            
        //}        

    }
}
function disable(){
    CancelInvoke("reenable");
    Invoke("reenable",.3);
    disabled = true;
}
function reenable(){
    controller.enabled = true;
    disabled = false;
    }

static function ClampAngle (angle : float, min : float, max : float) {
    if (angle < -360)
        angle += 360;
    if (angle > 360)
        angle -= 360;
    return Mathf.Clamp (angle, min, max);
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
