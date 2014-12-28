#pragma strict

class state_command extends minimalState{
	var resetTime:float = 3;
	var nextPress:float = 0.0;
	var clock:float = 0.0;
	var sm:stateMachine_command;

	function Start () {
		super.Start();
		sm = gameObject.GetComponent("stateMachine_command");

	}

	function Enter(){
		super.Enter();
		id = "command";
	
	}

	function Execute(){
		super.Execute();
		if (Input.GetButton("test") && clock >nextPress){
			nextPress = clock + resetTime;		
			test();
		}
		if (Input.GetAxisRaw("SwitchTeams") && clock > nextPress){
			nextPress = clock + resetTime;		
			SwitchTeams();
		}
		if (Input.GetAxisRaw("ToggleStance") && clock > nextPress){
			nextPress = clock + resetTime;
			ToggleStance();		
		}
		if (Input.GetButton("ToggleAttack")&& clock >nextPress){
			nextPress = clock + resetTime;	
			ToggleAim();
		}
		if (Input.GetButton("IssueOrder") && clock > nextPress && gameData.gameAttributes.inAction("Movement") == true){
			nextPress = clock + resetTime;	
			IssueOrder();
		}
		clock+=Time.unscaledDeltaTime;

	}

	function Exit(){
		super.Exit();
		Destroy(this);
	}
	function test(){
		
	}
	function SwitchTeams(){

	}
	function ToggleStance(){

	}
	function ToggleMovement(){

	}
	function ToggleAim(){

	}
	function IssueOrder(){

	}

	function changeState(s:String){
		sm.changeState(id+"_"+s);
	}
	function issueCodeOrder(){
		
		var ordersMovement:orders_movement = gameData.gameAttributes.playerTeam.orders_movement;
		var ordersAction:orders_action = gameData.gameAttributes.playerTeam.orders_action;

		print("so you want to use "+ordersMovement.currentOrder);
		gameData.orderManager.orderMenu.openMenu("action");
	}

}