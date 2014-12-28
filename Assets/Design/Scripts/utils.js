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


function AttatchToJoint(obj:GameObject,searchName:String):GameObject{
	for(var child:Transform in obj.transform){
		print(child.name);
		if (child.gameObject.name.Contains(searchName) && !child.gameObject.name.Contains("Ctrl")){
			return child.gameObject;
		}
		AttatchToJoint(child.gameObject,searchName);
	}
}


function ConstructBaseData():ArrayList{
	print("ok.. someone called construct base data");
	var list = new ArrayList();
	list.Add("");
	list.Add(Vector3.zero);
	list.Add("");
	list.Add(0.0);
	list.Add(new GameObject());
	list.Add(false);
	list.Add(new poi_data());
	list.Add(new orderData());
	return list;
}

function sendTactic(tacticName:String,od:orderData){
	var tn:String = "tactic_"+tacticName;
	var data:ArrayList = utils.ConstructBaseData();
	data[0] = tn;
	data[7] = od;
	od.team.gameObject.BroadcastMessage("changeState",data);
}
function sendTactic(tacticName:String,team:GameObject){
	var tn:String = "tactic_"+tacticName;
	var data:ArrayList = utils.ConstructBaseData();
	data[0] = tn;
	data[7] = new orderData();
	team.BroadcastMessage("changeState",data);
}

function sendTactic(tacticName:String,team:GameObject,od:orderData){
	var tn:String = "tactic_"+tacticName;
	var data:ArrayList = utils.ConstructBaseData();
	data[0] = tn;
	data[7] = od;
	team.BroadcastMessage("changeState",data);
}

function getAngleInCircle(max:float,index:float){
	return ((360/max) * 1+index);
}
function polarToVectorXZ(radius:float,angle:float):Vector3{
	var vec:Vector3;
	vec.x = Mathf.Cos(angle) * radius * angle;
	vec.z = Mathf.Sin(angle) * radius * angle;
	return vec;
}

}

