#pragma strict
var zoomMin:float = 1;
var zoomMax:float = 30;
var zoomIncriment:float = 6;
var cam:Camera;
var zoomCurrent:float = 20.0;
var zoomTo:float = 20.0;
var zoomAnimSpeed:float = 3.0;
var zoomTime:float = 0.0;

var gameData:gameData;

var xSpeed = 250.0;
var ySpeed = 120.0;
private var xSmooth = 0.0;
private var ySmooth = 0.0; 
private var xVelocity = 0.0;
private var yVelocity = 0.0;
var smoothTime = 0.3;

var yMinLimit = -50;
var yMaxLimit = 200;
var xMinLimit = -50;
var xMaxLimit = 200;
var startRotation:Vector3;;
private var x = 0.0;
private var y = 0.0;

var lastCall:float = 0.0;
function Start () {
	cam = gameObject.GetComponent("Camera");
	startRotation = transform.rotation.eulerAngles;
	gameData = new gameData();
	gameData.Start();
}

function Update () {
	if (gameData.gameAttributes.inUAV == true){
	    x += Input.GetAxis("Mouse X") * xSpeed * 0.01;
	    y -= Input.GetAxis("Mouse Y") * ySpeed * 0.01;
	    xSmooth = Mathf.SmoothDamp(xSmooth, x, xVelocity, smoothTime);
	    ySmooth = Mathf.SmoothDamp(ySmooth, y, yVelocity, smoothTime);
	   	//xSmooth = ClampAngle(ySmooth, yMinLimit, yMaxLimit);   	
	   	//ySmooth = ClampAngle(xSmooth, xMinLimit, xMaxLimit);
	   	var parentRot:Vector3 = transform.parent.rotation.eulerAngles;
	    var rotation = Quaternion.Euler(parentRot.x + startRotation.x+ySmooth,parentRot.y + startRotation.y+xSmooth,parentRot.z+startRotation.z);

		if (Input.GetAxisRaw("ZoomUAV") && Time.time > lastCall +.5){
			print(Input.GetAxisRaw("ZoomUAV"));
			lastCall = Time.time;
			zoom(Input.GetAxisRaw("ZoomUAV"));
		}
		if (zoomTime < 1.0){
			zoomTime += Time.deltaTime*zoomAnimSpeed;		
		}
		transform.rotation = rotation;
		cam.fieldOfView = Mathf.SmoothStep(zoomCurrent, zoomTo, zoomTime);

	}else{
		x = 0;
		y = 0;
		ySmooth = 0;
		xSmooth = 0;
	}
}

function zoom(value:float){
	zoomTime = 0.0;
	var scale = Rescale(zoomCurrent,zoomMin,zoomMax,1,10);
	var z:float = (zoomIncriment*scale * value);
	var currentSize = cam.fieldOfView;
	zoomCurrent = cam.fieldOfView;
	zoomTo = Mathf.Clamp(zoomCurrent+z,zoomMin,zoomMax); 
}

function Rescale (InputValue : float, SourceStart : float, SourceEnd : float, TargetStart : float, TargetEnd : float): float{
    return Mathf.Lerp(TargetStart,TargetEnd,(InputValue-SourceStart)/(SourceEnd-SourceStart));
}
static function ClampAngle (angle : float, min : float, max : float) {
    if (angle < -360)
        angle += 360;
    if (angle > 360)
        angle -= 360;
    return Mathf.Clamp (angle, min, max);
}
