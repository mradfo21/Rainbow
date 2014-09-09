#pragma strict

var text:String;
var min:float;
var max:float;
var value:float;
var color:Color;
private var uiText:UI.Text;
private var uiSlider:UI.Slider;
private var sliderImage:UI.Image;
function Start () {
	var obj:GameObject;
	obj = transform.Find("Slider").gameObject;
	uiSlider = obj.GetComponent("Slider");
	obj = transform.Find("Text").gameObject;
	uiText = obj.GetComponent("Text");
	obj = transform.Find("Slider/Fill Area/Fill").gameObject;
	sliderImage = obj.GetComponent("Image");
}

function Update () {
	uiText.text = text;
	uiSlider.minValue = min;
	uiSlider.maxValue = max;
	uiSlider.value = value;
	sliderImage.color = color;
}

function UpdateUI(ui:ui_info){
	if (ui.id == text){
		min = ui.min;
		max = ui.max;
		value = ui.value;
	}
}