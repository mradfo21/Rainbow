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
function Rescale (InputValue : float, SourceStart : float, SourceEnd : float, TargetStart : float, TargetEnd : float): float{
    return Mathf.Lerp(TargetStart,TargetEnd,(InputValue-SourceStart)/(SourceEnd-SourceStart));
}

function getAttributes(teammate:GameObject):attributes{
	var attrib:attributes = teammate.transform.parent.GetComponent("attributes");		
}
function isOccupiedByTeammate(pos:Vector3,team:team,memberAttributes:attributes):boolean{
	for (teammate in team.members){
		var attrib:attributes = getAttributes(teammate);
		var d:float = Vector3.Distance(memberAttributes.destination,attrib.destination);
		if (d < .8 && d >.001){
			return true;
		}
	}
	return false;
}

function isOccupiedByTeammate(pos:Vector3,radius:float,team:team,memberAttributes:attributes):boolean{
	for (teammate in team.members){
		var attrib:attributes = getAttributes(teammate);
		var d:float = Vector3.Distance(memberAttributes.destination,attrib.destination);
		if (d < radius && d >.001){
			return true;
		}
	}
	return false;

	}
}
