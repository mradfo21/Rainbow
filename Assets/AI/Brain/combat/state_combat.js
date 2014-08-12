#pragma strict
class state_combat extends state{

var gun:gun = null;
var cachedGun:boolean = false;
var holdfire:boolean = false;

	function Start () {
		super.Start();
	}

	function Update () {
		super.Update();
	}

	function Enter(){
		super.Enter();
		id = "combat";
		attributes.combat = this.GetType().ToString();
	}

	function Execute(){
		if (attributes.alive == false){
			Exit();
		}
		if (cachedGun == false){
			if (attributes.gun){
				gun = attributes.gun.GetComponent("gun");
				cachedGun = true;
			}
		}
		if (attributes.readyToFire == true && holdfire == false){
			fireWeapon();
		}
	}

	function fireWeapon(){		
		if (gun){
			if (attributes.target){
				gun.Shoot(attributes.target.transform.position);				
			}else if( attributes.coveringFire == true){
				var coverPos:Vector3 = (Random.insideUnitSphere*(3+Random.value*3)) + attributes.coverTarget;
				gun.Shoot(coverPos);
			}
		}
	}
	function Exit(){
		super.Exit();
		CancelInvoke();
	}



}

