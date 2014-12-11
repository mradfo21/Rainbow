#pragma strict

var text:UI.Text;
function Start () {
	text = gameObject.GetComponent("Text");
}

function Update () {
}

function UI_Set_Text(t:String){
	text.text = t;
}