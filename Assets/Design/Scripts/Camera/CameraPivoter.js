#pragma strict

var x:float;
var y:float;
var xSpeed = 250.0;
var ySpeed = 120.0;
private var xSmooth = 0.0;
private var ySmooth = 0.0; 
private var xVelocity = 0.0;
private var yVelocity = 0.0;
var yMinLimit = -50;
var yMaxLimit = 200; 
var smoothTime = 0.3;
var reset:boolean = false;

function Start () {

}

function Update () {
        x += Input.GetAxis("Mouse X") * xSpeed * 0.01;
        y -= Input.GetAxis("Mouse Y") * ySpeed * 0.01;
        xSmooth = Mathf.SmoothDamp(xSmooth, x, xVelocity, smoothTime);
        ySmooth = Mathf.SmoothDamp(ySmooth, y, yVelocity, smoothTime);
        ySmooth = ClampAngle(ySmooth, yMinLimit, yMaxLimit);
        var rotation = Quaternion.Euler(ySmooth, xSmooth, 0);  

    if (Input.GetAxis("ToggleLook")){
        if (reset == true){  	
            x = 0;
            y = 0;
            ySmooth = transform.parent.rotation.eulerAngles.y;
            xSmooth = transform.parent.rotation.eulerAngles.x;
        }
        var rot:Vector3 = transform.parent.rotation.eulerAngles;
        var r:Quaternion;
        r.eulerAngles = Vector3(rot.x+y,rot.y+x,0);
        transform.rotation = r;

        reset = false;
    }else{
        if (reset == false){
            reset = true;
        }
        var endRot:Quaternion = transform.parent.rotation;
        transform.rotation = Quaternion.Slerp(transform.rotation,endRot,Time.deltaTime*5);
    }
}

static function ClampAngle (angle : float, min : float, max : float) {
    if (angle < -360)
        angle += 360;
    if (angle > 360)
        angle -= 360;
    return Mathf.Clamp (angle, min, max);
}