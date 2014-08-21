#pragma strict

// this class controls rotating around the character as he moves
// it has noise to recreate camera shake
var target : Transform;
var distance = 5.0;
var height = 1.1;

var xSpeed = 250.0;
var ySpeed = 120.0;
 
var yMinLimit = -200;
var yMaxLimit = 800;

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
}

function Update () {



    if (gameData.gameAttributes.player) {

       // var offset:Vector3 = gameData.gameAttributes.player.transform.right;
		goal = gameData.gameAttributes.player.transform.position;

		//goalOffsetForward =  gameData.gameAttributes.player.transform.parent.transform.forward * (-1* 1);
		goal.y += height;
        //goal+= offset;

		//if (Vector3.Distance(goal+offset,goal) > 2.0){

		//}else{
		//offset += gameData.gameAttributes.playerAttributes.agent.velocity*.03;			
		//}
		//offset/= 1.05;

		//goal+= offset;

        x += Input.GetAxis("Mouse X") * xSpeed * 0.01;
        y -= Input.GetAxis("Mouse Y") * ySpeed * 0.01;
        
        xSmooth = Mathf.SmoothDamp(xSmooth, x, xVelocity, smoothTime);
        ySmooth = Mathf.SmoothDamp(ySmooth, y, yVelocity, smoothTime);
        ySmooth = ClampAngle(ySmooth, yMinLimit, yMaxLimit);
 
        var rotation = Quaternion.Euler(ySmooth, xSmooth, 0);
       	posSmooth = Vector3.SmoothDamp(posSmooth,goal,posVelocity,smoothTime);
 		
        transform.rotation = rotation;
        transform.position = rotation * Vector3(0.0, 0.0, - distance) + posSmooth;


}
 
}
static function ClampAngle (angle : float, min : float, max : float) {
    if (angle < -360)
        angle += 360;
    if (angle > 360)
        angle -= 360;
    return Mathf.Clamp (angle, min, max);
}
