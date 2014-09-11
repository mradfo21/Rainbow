#pragma strict

var baseColor:Color;
var eEnterPlanning:Color= Color.clear;
var eExitPlanning:Color = Color.clear;
var eIssuedOrder:Color = Color.clear;
var eSwitchedTeam:Color = Color.clear;
var eAddedTeam:Color = Color.clear;
var material:Material;

function Start () {
	material = gameObject.renderer.material;
	baseColor = material.GetColor("_TintColor");
}

function Update () {

}
function EnterPlanning(){
		if (eEnterPlanning!= Color.clear){
			renderer.material.SetColor("_TintColor",eEnterPlanning);	
		}else{
			renderer.material.SetColor("_TintColor",baseColor);	
		}

}
function ExitPlanning(){
		if (eExitPlanning!= Color.clear){
			//material.color = eExitPlanning;	
		}else{
			//material.color = baseColor;
		}
}
function IssuedOrder(order:String){
		if (eIssuedOrder!= Color.clear){
			print("CHANGING COLOR TO "+eIssuedOrder);
			renderer.material.SetColor("_TintColor",eIssuedOrder);	
			print("MAT COLOR IS NOW : "+material.GetColor("_Tint"));
		}else{
			renderer.material.SetColor("_TintColor",baseColor);	
		}
}
function SwitchedTeam(t:team){
		if (eSwitchedTeam!= Color.clear){
			renderer.material.SetColor("_TintColor",eSwitchedTeam);	
		}else{
			renderer.material.SetColor("_TintColor",baseColor);	
		}
}
function AddedTeam(t:team){
		if (eAddedTeam!= Color.clear){
			renderer.material.SetColor("_TintColor",eAddedTeam);	
		}else{
			renderer.material.SetColor("_TintColor",baseColor);	
		}
}