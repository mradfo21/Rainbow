#pragma strict

var baseColor:Color;
var eEnterPlanning:Color= Color.clear;
var eExitPlanning:Color = Color.clear;
var eIssuedOrder:Color = Color.clear;
var eSwitchedTeam:Color = Color.clear;
var eAddedTeam:Color = Color.clear;
var material:Material;

function Start () {
	material = gameObject.GetComponent.<Renderer>().material;
	baseColor = material.GetColor("_TintColor");
}

function Update () {

}

function Reset(){
		GetComponent.<Renderer>().material.SetColor("_TintColor",baseColor);	
}
function Selected(){
		if (eEnterPlanning!= Color.clear){
			GetComponent.<Renderer>().material.SetColor("_TintColor",eEnterPlanning);	
		}else{
			GetComponent.<Renderer>().material.SetColor("_TintColor",baseColor);	
		}

}
function Deselected(){
		if (eExitPlanning!= Color.clear){
			//material.color = eExitPlanning;	
		}else{
			//material.color = baseColor;
		}
}
function IssuedOrder(order:String){
		if (eIssuedOrder!= Color.clear){
			GetComponent.<Renderer>().material.SetColor("_TintColor",eIssuedOrder);	
		}else{
			GetComponent.<Renderer>().material.SetColor("_TintColor",baseColor);	
		}
}
function SwitchedTeam(t:team){
		if (eSwitchedTeam!= Color.clear){
			GetComponent.<Renderer>().material.SetColor("_TintColor",eSwitchedTeam);	
		}else{
			GetComponent.<Renderer>().material.SetColor("_TintColor",baseColor);	
		}
}
function AddedTeam(t:team){
		if (eAddedTeam!= Color.clear){
			GetComponent.<Renderer>().material.SetColor("_TintColor",eAddedTeam);	
		}else{
			GetComponent.<Renderer>().material.SetColor("_TintColor",baseColor);	
		}
}