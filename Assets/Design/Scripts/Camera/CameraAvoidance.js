#pragma strict

var leftPoint:Vector3;
var rightPoint:Vector3;
var frontPoint:Vector3;
var backPoint:Vector3;
var upPoint:Vector3;
var downPoint:Vector3;

var leftBumper:float = 0.0;
var rightBumper:float = 0.0;
var frontBumper:float = 0.0;
var backBumper:float = 0.0;
var upBumper:float = 0.0;
var downBumper:float = 0.0;

var leftOffset:Vector3;
var rightOffset:Vector3;
var frontOffset:Vector3;
var backOffset:Vector3;
var upOffset:Vector3;
var downOffset:Vector3;

var offsetLocation:Vector3;
var offsetStrength:float = 1.0;
var offsetDamp:float = 10.0;
var distance:float = 5;

var pt:Vector3;
var v:Vector3;
var vOffset:float = 1.0;
var probe:Transform;
var probePosition:Vector3;

function Start () {
	StartCoroutine( CalcVelocity() );

}

function Update () {

	var layerMask = 1 << 12;
	var hit:RaycastHit;
	probe = transform;
	offsetLocation = Vector3.zero;
	probePosition = probe.position;
	if (Physics.Raycast(probePosition,probe.right,hit,distance,layerMask)){
		rightPoint =  hit.point;


	}
		if(Vector3.Distance(probePosition,rightPoint) < distance){

		rightBumper = distance -(Vector3.Distance(probe.position,rightPoint));
		rightOffset = probePosition-rightPoint;
		offsetLocation+= ( (-probe.right * rightBumper) );
		}

	if (Physics.Raycast(probePosition,-probe.right,hit,distance,layerMask)){
		leftPoint =  hit.point;

	}
		if(Vector3.Distance(probePosition,leftPoint) < distance){

		leftBumper = distance -(Vector3.Distance(probePosition,leftPoint));
		leftOffset = probePosition-leftPoint;
		offsetLocation+= ( (probe.right * leftBumper) );
		}
	if (Physics.Raycast(transform.position,probe.forward,hit,distance,layerMask)){
		frontPoint =  hit.point;
	}
		if(Vector3.Distance(probePosition,frontPoint) < distance){

		frontBumper = distance -(Vector3.Distance(probePosition,frontPoint));
		frontOffset = probePosition-frontPoint;
		offsetLocation+= ( (-probe.forward * frontBumper) );
		}
	if (Physics.Raycast(probePosition,-probe.forward,hit,distance,layerMask)){
		backPoint =  hit.point;
	}
		if(Vector3.Distance(probePosition,backPoint) < distance){

		backBumper = distance -(Vector3.Distance(probePosition,backPoint));
		backOffset = probePosition-backPoint;
		offsetLocation+= ( (probe.forward * backBumper) );
		}
	if (Physics.Raycast(probePosition,probe.up,hit,distance,layerMask)){
		upPoint =  hit.point;
	}
		if(Vector3.Distance(probePosition,upPoint) < distance){

		upBumper = distance -(Vector3.Distance(probePosition,upPoint));
		upOffset = probePosition-upPoint;
		//offsetLocation+= ( (-probe.up * upBumper) );
		}
	if (Physics.Raycast(probePosition,-probe.up,hit,distance,layerMask)){
		downPoint =  hit.point;
	}

		if(Vector3.Distance(probePosition,downPoint) < distance){
			downBumper = distance -(Vector3.Distance(probePosition,downPoint));
			downOffset = probePosition-downPoint;			
		}



	Debug.DrawLine(probePosition,leftPoint,Color(leftBumper,0,0,1));
	Debug.DrawLine(probePosition,rightPoint,Color(rightBumper,0,0,1));
	Debug.DrawLine(probePosition,frontPoint,Color(frontBumper,0,0,1));
	Debug.DrawLine(probePosition,backPoint,Color(backBumper,0,0,1));
	Debug.DrawLine(probePosition,upPoint,Color(upBumper,0,0,1));
	Debug.DrawLine(probePosition,downPoint,Color(downBumper,0,0,1));



	var returnToParent:Vector3 = transform.parent.position- transform.position;
	transform.position+= ((offsetLocation)* offsetStrength) * Time.deltaTime ;
	transform.position+= (returnToParent *offsetDamp) * Time.deltaTime;

}

function CalcVelocity():IEnumerator
{
  while( Application.isPlaying )
  {
    pt = transform.position;
    yield new WaitForEndOfFrame();
    v = (pt - transform.position) * Time.deltaTime;
  }
}