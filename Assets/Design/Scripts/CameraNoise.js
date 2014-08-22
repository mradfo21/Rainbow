#pragma strict

private var cameraTime:float;
private var ct:Vector3 = Vector3.zero;
private var pt:Vector3 = Vector3.zero;
private var v:Vector3 = Vector3.zero;
var vFactor:float;
var velocityNoise:float = 0.0;
private var rollX:float = 0.0;
private var rollY:float = 0.0;
private var rollZ:float = 0.0;
var gameData:gameData;

var zRoll:float = 1;
var xRoll:float = 1;
var yRoll:float = 1;
var damp:float = 1.55;
var magnitude:float = 1;
var rollSpeed:float = 1.0;
var rollMag:float = 1.0;
var oscilateSpeed:float = 2.2;
var oscilateAmt:float = 1.0;
var oscilation:Vector3;
var rollOscilation:Vector3;
var noiseOscilation:Vector3;
var jitterOscilation:Vector3;
function Start () {
	StartCoroutine( CalcVelocity() );
	gameData = new gameData();
	gameData.Start();
}

function FixedUpdate(){

}
function Update () {

	cameraTime+= Time.deltaTime;

	// a vector for moving the camera. i kind of dont like this
	var speedMult = 1;
	var agentVelocity:float = 0.0;
	if (gameData.gameAttributes.player){
      var agent:NavMeshAgent = gameData.gameAttributes.playerAttributes.agent;
      agentVelocity = agent.velocity.magnitude;
      speedMult = 1+ agentVelocity*.2;
	}
	oscilation.x =  Mathf.Cos(cameraTime*3*(oscilateSpeed  ))* oscilateAmt * vFactor;
	oscilation.y=   Mathf.Cos(cameraTime*(oscilateSpeed  )) * oscilateAmt * vFactor;
	oscilation.z=   Mathf.Sin(cameraTime*1.5*(oscilateSpeed  )) * oscilateAmt * vFactor;

	// a vector for the role
	rollOscilation.x =  Mathf.Cos(cameraTime*speedMult*3*(rollSpeed  ))* rollMag * vFactor;
	rollOscilation.y=   Mathf.Cos(cameraTime*speedMult*1*(rollSpeed  )) * rollMag * vFactor;
	rollOscilation.z=   Mathf.Sin(cameraTime*speedMult*1.5*(rollSpeed  )) * rollMag * vFactor;

	// a vector for the jitter - i generally downplay this
	var noiseSpeed = 2;
	noiseOscilation.x = Mathf.PerlinNoise((cameraTime *noiseSpeed+ vFactor),0.0) - .5;
	noiseOscilation.y = Mathf.PerlinNoise((cameraTime*noiseSpeed+ vFactor+ 100),0.0) - .5;
	noiseOscilation.z = Mathf.PerlinNoise((cameraTime*(noiseSpeed/2)+ vFactor+ 800),0.0) - .5;
	
	jitterOscilation.x = Mathf.PerlinNoise((cameraTime *noiseSpeed *2+ vFactor),-1000.0) - .5;
	jitterOscilation.y = Mathf.PerlinNoise((cameraTime *noiseSpeed *2+ vFactor+ 600),0.0) - .5;
	jitterOscilation.z = Mathf.PerlinNoise((cameraTime *(noiseSpeed/2) *2+ vFactor+1200),0.0) - .5;

	// strength of jitter
	noiseOscilation*= 1+(4  * vFactor);
	jitterOscilation*= (20 * speedMult) * ( (speedMult-1) * 20);
//	transform.position = transform.parent.position+oscilation;

	rollX+= rollOscilation.x;
	rollY+= rollOscilation.y;
	rollZ+= rollOscilation.z;

	var angleMult:float = 1+vFactor * rollMag;
	var angleX:float = rollX*xRoll *angleMult;
	var angleY:float = rollY*yRoll * angleMult;
	var angleZ:float = rollZ*zRoll*-1 * angleMult;

	var shake:Vector3 = Vector3(angleX,angleY,angleZ);
	var parentRot:Vector3 = transform.parent.eulerAngles;

	transform.rotation.eulerAngles = parentRot+shake+noiseOscilation + jitterOscilation;

	rollX-=(rollX/damp) *Time.deltaTime;
	rollY-=(rollY/damp) *Time.deltaTime;
	rollZ-=(rollZ/damp) *Time.deltaTime;
}

function CalcVelocity():IEnumerator
{
  while( Application.isPlaying )
  {
    pt = transform.parent.position;
    yield new WaitForEndOfFrame();
    v = (pt - transform.parent.position) * Time.deltaTime;
    vFactor+=(v.magnitude * 5);
    // this is important. it dampens the velocity. this will tune your natural rolling motions
    vFactor-= (vFactor/1.04) * Time.deltaTime;
    // i found clamping it between 0 and 1, then tweaking the damp made the whole process much more intuative above
    vFactor= Mathf.Clamp(vFactor,0,1);
  }
}
