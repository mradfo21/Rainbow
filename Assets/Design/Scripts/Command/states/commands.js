#pragma strict
var gameData:gameData;
var playerTeam:team;
var nextPress:float = 0.0;
var resetTime:float = .03;
var layerMask:int;        
var stanceIndex:int = 1;
var stanceMap = new Dictionary.<int,GameObject>();

var holdTime:float = 0.0;
var clock:float = 0.0;


var orderHoldList = new List.<float>();
var orderHoldListBools = new List.<boolean>();
var orderHoldListHasFired = new List.<boolean>();

function Start () {

 	gameData = new gameData();
	gameData.Start();
    layerMask = 1 << 12;

    orderHoldList.Add(0.0);
    orderHoldList.Add(0.0);
    orderHoldList.Add(0.0);
    orderHoldList.Add(0.0);
    orderHoldList.Add(0.0);

    orderHoldListBools.Add(false);
    orderHoldListBools.Add(false);
    orderHoldListBools.Add(false);
    orderHoldListBools.Add(false);
    orderHoldListBools.Add(false);

    orderHoldListHasFired.Add(false);
    orderHoldListHasFired.Add(false);
    orderHoldListHasFired.Add(false);
    orderHoldListHasFired.Add(false);
    orderHoldListHasFired.Add(false);   // Screen.lockCursor = true;
}

function changeAction(state:String){
	gameObject.SendMessage("changeState","action_"+state,SendMessageOptions.DontRequireReceiver);
}
function changeCamera(state:String){
	gameData.cameraManager.changeState(state);
}
function ToggleStance(){
		nextPress = clock + resetTime;	
		gameData.gameAttributes.playerTeam.stances.currentStanceIndex += Input.GetAxisRaw("ToggleStance");
}

function tappedButton(number:int){
	if (number <= 1){
		gameData.orderManager.setOrder(1);
		gameData.orderManager.movementIcons.resetPos();
	}

}

function heldButton(number:int){

	if (number > 1){
		if (gameData.gameAttributes.inAction("Movement") != true){
			changeAction("actionMovement");			
		}
		orderHoldListHasFired[number] = true;
	}
}

function releasedButton(number:int){
	if (number > 1){
		setOrExecute(number);
		if (gameData.gameAttributes.inAction("Movement") == true){
			changeAction("actionNeutral");			
		}
		gameData.orderManager.movementIcons.resetPos();
		orderHoldListBools[number] = false;
		orderHoldListHasFired[number] = false;
	}

	
}

function setOrExecute(number:int){
	if (gameData.gameAttributes.inAction("Neutral") == true){
		gameData.orderManager.executeOrder(number);
	}else if (gameData.gameAttributes.inAction("Movement") == true){
		gameData.orderManager.setOrder(number);		
	}
}
function detectButtonHold(){
	for (var i = 0; i < orderHoldList.Count; i+=1){
		if (orderHoldList[i] > 10.0){
			orderHoldListBools[i] = true;
			if (orderHoldListHasFired[i] == false){
				heldButton(i);
			}
		}
	}

}

function Update () {
	if (gameData.gameAttributes.teams.playerTeam){
	detectButtonHold();
	playerTeam = gameData.gameAttributes.teams.playerTeam;
	if (Input.GetButton("IssueOrder") && clock > nextPress && gameData.gameAttributes.inAction("Movement") == true){
	}
	
	if (Input.GetButton("ToggleAttack")&& clock >nextPress){
		if (gameData.gameAttributes.inAction("Aim") == true){
			changeAction("actionNeutral");			
		}else{
			changeAction("actionAim");			
		}
		nextPress = clock + resetTime;

	}


	if (Input.GetButton("R2") && clock >nextPress){
		//if (gameData.gameAttributes.inAction("Movement") == true){
		//	changeAction("actionNeutral");			
		//}else{
		//	changeAction("actionMovement");			
		//}
		gameData.gameAttributes.teams.playerTeam.changeRotationState("lookCameraDirection");
		nextPress = clock + resetTime;		
	}


	if (Input.GetAxisRaw("ToggleStance") && clock > nextPress){
		ToggleStance();
		nextPress = clock + resetTime;		

	}


	if (Input.GetAxisRaw("SwitchTeams") && clock > nextPress){
		gameData.teams.teamIndex +=Input.GetAxisRaw("SwitchTeams");
		gameData.teams.SwitchTeams();
		Invoke("ToggleStance",.3);
		nextPress = clock + resetTime;		

	}

	if (Input.GetButton("test") && clock >nextPress){
		gameData.orderManager.orderMenu.openMenu("movement");
		nextPress = clock + resetTime;		
	}

	if (Input.GetAxis("NavHorizontal") && clock >nextPress){
		if (gameData.gameAttributes.inAction("Movement") == true){
		nextPress = clock + resetTime;
		gameData.orderManager.orderMenu.switchOrder(Input.GetAxis("NavHorizontal") );
		}
		
	}

	if (Input.GetButton("one")){

		if ( clock >nextPress){
			nextPress = clock + resetTime;
			tappedButton(1);
		}

		orderHoldList[1]+= 1;	
	}else{
		if (orderHoldList[1] > 1.0){
		}
		orderHoldList[1]= 0;	
	}

	if (Input.GetButton("two")){

		if ( clock >nextPress){
			nextPress = clock + resetTime;
			tappedButton(2);
		}

		orderHoldList[2]+= 1;		
	}else{
		if (orderHoldList[2] > 1.0){
			releasedButton(2);
		}
		orderHoldList[2] = 0;		
	}

	if (Input.GetButton("three")){

		if ( clock >nextPress){
			nextPress = clock + resetTime;
			tappedButton(3);	
		}

		orderHoldList[3]+= 1;			
	}else{
		if (orderHoldList[3] > 1.0){
			releasedButton(3);
		}
		orderHoldList[3] = 0;		
	}

	if (Input.GetButton("four")){

		if ( clock >nextPress){
			nextPress = clock + resetTime;
			tappedButton(4);
		}

		orderHoldList[4]+= 1;				
	}else{
		if (orderHoldList[4] > 1.0){
			releasedButton(4);
		}
		orderHoldList[4] = 0;			
	}

	

	if (Input.GetAxisRaw("stickRight") && clock > nextPress){
		print("STICK RIGHT PRESSED");
		gameData.orderManager.movementIcons.resetPos();
		if (gameData.gameAttributes.inAction("Movement") == true){
			print("STICK PRESSED WHILE MENU IS OPEN");
		}
		nextPress = clock + resetTime;		
	}
	if (Input.GetAxisRaw("stickLeft") && clock > nextPress){
		nextPress = clock + resetTime;	
		print("STICK LEFT PRESSED");
		if (gameData.gameAttributes.inAction("Movement") == true){
			print("STICK PRESSED WHILE MENU IS OPEN");
		}
		nextPress = clock + resetTime;		
	}
	clock+=Time.unscaledDeltaTime;
	}
}