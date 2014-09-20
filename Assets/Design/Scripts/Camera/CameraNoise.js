#pragma strict

private var cameraTime:float;
private var ct:Vector3 = Vector3.zero;
private var pt:Vector3 = Vector3.zero;
private var v:Vector3 = Vector3.zero;
var vFactor:float;
var vFactorIncrease:float = 1.0;
private var rollX:float = 0.0;
private var rollY:float = 0.0;
private var rollZ:float = 0.0;
var gameData:gameData;

var zRoll:float = 1;
var xRoll:float = 1;
var yRoll:float = 1;

var damp:float = 1.55;
var amt:float = 1;
var rollSpeed:float = 1.0;
var rollAmt:float = 1.0;

var noiseAmt:float = 1.0;
var noiseSpeed:float = 1.0;
var jitterAmt:float = 1.0;

private var rollOscilation:Vector3;
private var noiseOscilation:Vector3;
private var jitterOscilation:Vector3;
function Start () {
	StartCoroutine( CalcVelocity() );
	gameData = new gameData();
	gameData.Start();
}

function FixedUpdate(){

}
function Update () {
    if (gameData.gameAttributes.inPlanning == false){

		cameraTime+= Time.deltaTime;

		// a vector for moving the camera. i kind of dont like this
		var speedMult = 1;
		var agentVelocity:float = 0.0;
		if (gameData.gameAttributes.playerAttributes){
	      var agent:NavMeshAgent = gameData.gameAttributes.playerAttributes.agent;
	      agentVelocity = agent.velocity.magnitude;
	      speedMult = 1+ agentVelocity*.2;
		}
		// a vector for the role
		rollOscilation.x =  Mathf.Cos(cameraTime*speedMult*3*(rollSpeed  ))* rollAmt * (.05+ vFactor);
		rollOscilation.y=   Mathf.Cos(cameraTime*speedMult*1*(rollSpeed  )) * rollAmt * (.05+ vFactor);
		rollOscilation.z=   Mathf.Sin(cameraTime*speedMult*1.5*(rollSpeed  )) * rollAmt * (.05+ vFactor);

		// a vector for adding noise
		noiseOscilation.x = Mathf.PerlinNoise((cameraTime*2*noiseSpeed),0.0) - .5;
		noiseOscilation.y = Mathf.PerlinNoise((cameraTime*2*noiseSpeed+100),0.0) - .5;
		noiseOscilation.z = Mathf.PerlinNoise((cameraTime*2*(noiseSpeed/2)+800),0.0) - .5;
		
		// a vector for perorming jitter
		jitterOscilation.x = Mathf.PerlinNoise((cameraTime *vFactor *2+ vFactor),-1000.0) - .5 * jitterAmt;
		jitterOscilation.y = Mathf.PerlinNoise((cameraTime *vFactor *2+ vFactor+ 600),0.0) - .5 * jitterAmt;
		jitterOscilation.z = Mathf.PerlinNoise((cameraTime *(vFactor/2) *2+ vFactor+1200),0.0) - .5 * jitterAmt;


		noiseOscilation*= 1+(2  * vFactor) * noiseAmt;
		jitterOscilation*= 5 +(20 * speedMult) * ( (speedMult-1) * 20);

		transform.position = transform.parent.position;
		rollX+= rollOscilation.x + (noiseOscilation.x * noiseAmt);
		rollY+= rollOscilation.y + (noiseOscilation.y * noiseAmt);
		rollZ+= rollOscilation.z + (noiseOscilation.z * noiseAmt);


		var angleMult:float = 1+vFactor;
		var angleX:float = rollX*xRoll *angleMult;
		var angleY:float = rollY*yRoll * angleMult;
		var angleZ:float = rollZ*zRoll*-1 * angleMult;

		var shake:Vector3 = Vector3(angleX,angleY,angleZ);
		var parentRot:Vector3 = transform.parent.eulerAngles;

		transform.rotation.eulerAngles = parentRot+ (shake * amt) + Vector3.Lerp(Vector3.zero,jitterOscilation,jitterAmt);

		rollX-=(rollX/damp) *Time.deltaTime;
		rollY-=(rollY/damp) *Time.deltaTime;
		rollZ-=(rollZ/damp) *Time.deltaTime;
	}
}

function CalcVelocity():IEnumerator
{
  while( Application.isPlaying )
  {
    pt = transform.parent.position;
    yield new WaitForEndOfFrame();
    v = (pt - transform.parent.position) * Time.deltaTime;
    vFactor+=(v.magnitude * (5 * vFactorIncrease) );
    // this is important. it dampens the velocity. this will tune your natural rolling motions
    vFactor-= (vFactor/1.04) * Time.deltaTime;
    // i found clamping it between 0 and 1, then tweaking the damp made the whole process much more intuative above
    vFactor= Mathf.Clamp(vFactor,0,1);
  }
}
