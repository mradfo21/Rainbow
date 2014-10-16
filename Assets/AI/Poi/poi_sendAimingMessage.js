#pragma strict
var gameData:gameData;

function Start () {
 	gameData = new gameData();
	gameData.Start();
	if (gameData.gameAttributes.cameraState == "aimCrouch"){
		gameData.gameAttributes.cameras.BroadcastMessage("changeState","camera_camCrouch");

	}else if (gameData.gameAttributes.cameraState == "aimStand"){
		gameData.gameAttributes.cameras.BroadcastMessage("changeState","camera_camRun");

	}else if (gameData.gameAttributes.cameraState == "aimProne"){
		gameData.gameAttributes.cameras.BroadcastMessage("changeState","camera_camProne");

	}else if (gameData.gameAttributes.cameraState == "sprint"){
		gameData.gameAttributes.cameras.BroadcastMessage("changeState","camera_camAimStand");

	}else if (gameData.gameAttributes.cameraState == "run"){
		gameData.gameAttributes.cameras.BroadcastMessage("changeState","camera_camAimStand");

	}else if (gameData.gameAttributes.cameraState == "crouch"){
		gameData.gameAttributes.cameras.BroadcastMessage("changeState","camera_camAimCrouch");

	}else if (gameData.gameAttributes.cameraState == "prone"){
		gameData.gameAttributes.cameras.BroadcastMessage("changeState","camera_camAimProne");

	}

}

function Update () {

}