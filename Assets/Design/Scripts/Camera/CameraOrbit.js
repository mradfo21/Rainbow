#pragma strict

// this class controls rotating around the character as he moves
// it has noise to recreate camera shake
var distance = 5.0;
var minimumDistance:float = 2.0;
var bottomHeight:float = 2.0;
var topHeight:float = 1.0;

var xSpeed = 250.0;
var ySpeed = 120.0;
 
var yMinLimit = -50;
var yMaxLimit = 200;
var controller:CharacterController;
var v:Vector3;
var distanceToGoal:float;
var vmag:float;
private var vFactor:float;
private var x = 0.0;
private var y = 0.0;
 
 
var smoothTime = 0.3;
var smoothTimeSlowMo = .001;

private var xSmooth = 0.0;
private var ySmooth = 0.0; 
private var xVelocity = 0.0;
private var yVelocity = 0.0;
 
private var posSmooth = Vector3.zero;
private var posVelocity = Vector3.zero;
 
var offset:Vector3;

var gameData:gameData;
var target:Vector3;
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
        distanceToGoal = Vector3.Distance(transform.position,goal);
        var avoidanceForce:Vector3 = Vector3.zero;
        if (Physics.Raycast(goal,dirToGoal,hit,distanceToGoal,layerMask)){
            Debug.DrawLine(goal,hit.point);
            avoidanceForce =  hit.point - transform.position;
        }
        if (distanceToGoal > 5.0){
            return Vector3.zero;    
        }else{
            return avoidanceForce;    
        }
}
function Update () {

    vmag = v.magnitude;

        if (gameData.gameAttributes.player) {

            var agent:NavMeshAgent = gameData.gameAttributes.playerAttributes.agent;
            vFactor += Mathf.Clamp(agent.desiredVelocity.magnitude*.1,0,1) * Time.deltaTime;
            vFactor -= (vFactor/1.01) * Time.deltaTime;

            // to compute side offsets
            //var toGoal:Vector3 = (transform.position - target).normalized;
            //var facingRatio:float = Vector3.Dot(gameData.gameAttributes.player.transform.forward,toGoal);
            
            var finalHeight = Rescale(ySmooth,yMinLimit,yMaxLimit,bottomHeight,topHeight);
    		target.y += finalHeight;
            var finalSmoothTime:float = smoothTime;

            if (!Input.GetAxis("ToggleLook") && gameData.gameAttributes.inUAV == false){

            x += Input.GetAxis("Mouse X") * xSpeed * 0.01;
            y -= Input.GetAxis("Mouse Y") * ySpeed * 0.01;
            finalSmoothTime = smoothTime;
            }else{
            finalSmoothTime = smoothTimeSlowMo;
            }

            xSmooth = Mathf.SmoothDamp(xSmooth, x, xVelocity, smoothTime);
            ySmooth = Mathf.SmoothDamp(ySmooth, y, yVelocity, smoothTime);
            ySmooth = ClampAngle(ySmooth, yMinLimit, yMaxLimit);
     
            var rotation = Quaternion.Euler(ySmooth, xSmooth, 0);
           	posSmooth = Vector3.SmoothDamp(posSmooth,target,posVelocity,finalSmoothTime);

            var finalDistance = minimumDistance+(distance*vFactor);
            //var finalDistance = distance;

            transform.position = (rotation * Vector3(0.0, 0.0, - finalDistance) + posSmooth);
            
            transform.LookAt(target);
            transform.rotation= rotation;
            transform.position+= collisionTest(target);
        }
}

function CameraTarget(goal:Vector3){
    target = goal;
}
static function ClampAngle (angle : float, min : float, max : float) {
    if (angle < -360)
        angle += 360;
    if (angle > 360)
        angle -= 360;
    return Mathf.Clamp (angle, min, max);
}
function Rescale (InputValue : float, SourceStart : float, SourceEnd : float, TargetStart : float, TargetEnd : float): float{
    return Mathf.Lerp(TargetStart,TargetEnd,(InputValue-SourceStart)/(SourceEnd-SourceStart));
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
