#pragma strict

var text:UI.Text;
var image:UI.Image;


function Awake () {
	text = transform.Find("icon_text").gameObject.GetComponent("Text");
	image = transform.Find("icon_image").gameObject.GetComponent("Image");

}

function Update () {

}

function setText(t:String){
	text.text = t;
}

function setImage(){

}