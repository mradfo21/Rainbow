#pragma strict
public static class utils{

function getPositionClicked():RaycastHit{
	var hit:RaycastHit;
	var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	Physics.Raycast(ray,hit);
	return hit;
}
function getPositionScreen():RaycastHit{
    var layerMask = 1 << 12;        
	var hit:RaycastHit;
	var ray = Camera.main.ScreenPointToRay( Vector3(Screen.width/2,Screen.height/2,1.0) ) ;
	Physics.Raycast(ray,hit,10000,layerMask);
	return hit;
}
function getScreenPositionClicked(position:Vector3):RaycastHit{
	var hit:RaycastHit;
	var ray = Camera.main.ScreenPointToRay(position);
	Physics.Raycast(ray,hit);
	return hit;
}


}
