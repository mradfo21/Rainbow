#pragma strict

	var attributes:attributes;
	var bullet:GameObject;
	var fire:boolean = false;
	var fireRate:float = .3;
	var stability:float = 1;
	var shakeSpeed:float = 10;
	var fireOffset:Vector3 = Vector3.zero;
	var alive:boolean = true;
	var damage:float = 20.0;
	var currentTarget:Vector3;
	var host:GameObject;
	var lastFire:float = 0.0;
	var contactTimeMax:float = 15.0;
	var contactTime:float = 0.0;
	var sendContact:boolean = true;

	var poi_contact:GameObject;
	function Start () {
	}

	function ShotCharacter(obj:GameObject):boolean{
		var character:GameObject = obj.transform.gameObject.transform.parent.gameObject;
		var targetAttributes:attributes = character.GetComponent("attributes");
		// this prevents friendly fire
		if (attributes.species== targetAttributes.species){
			return false;
		}else{
			character.BroadcastMessage("Attacked",damage,SendMessageOptions.DontRequireReceiver);			
			return true;
		}
	}

	function generateContactPOI(pos:Vector3){
		if (sendContact == true){
			var poi:GameObject = Instantiate(poi_contact,pos,Quaternion.identity);
			var data:poi_data = new poi_data();
			data.origin = transform.position;
			data.species = attributes.species;
			data.pos = pos;
			poi.SendMessage("setup",data);
			sendContact = false;
			contactTime = contactTimeMax;
		}
	}
	function Shoot(target:Vector3){
		if (attributes.alive == true){
		if (lastFire <= 0.0){

			var dir:Vector3 = (target-transform.position).normalized;
			var ray:Ray = Ray(transform.position,dir+GunShake());
			var hit:RaycastHit;
			var bulletDest:Vector3;
			var shootingFriendly:boolean = false;
			var enemy:boolean = true;
			if(Physics.Raycast(ray,hit,1000)){
				bulletDest= hit.point;
				if (hit.collider.gameObject.tag == "character"){
					enemy = ShotCharacter(hit.collider.gameObject);
				}
			}else{
				bulletDest = ray.GetPoint(1000);
				notifyFired();
			}
			if (enemy == true){
				var b:GameObject = Instantiate(bullet,bulletDest,Quaternion.identity);	
				b.BroadcastMessage("Fired",gameObject);
				b.SendMessage("Info",hit);	
				notifyFired();		
				fire = false;
				lastFire = fireRate;
				generateContactPOI(bulletDest);
			}

			}

		}


	}
	function notifyFired(){
		host.BroadcastMessage("ShotWeapon");
	}
	function GunShake():Vector3{
		var gunShake:Vector3 = Vector3.zero;
		gunShake.x = Mathf.Cos(Time.time * shakeSpeed) * (stability);
		gunShake.y = Mathf.Sin(Time.time * shakeSpeed*2) * (stability);
		gunShake.x = Mathf.Cos(Time.time * shakeSpeed*4) * (stability);
		return gunShake * ((attributes.agent.velocity).magnitude * 1);	
	}
	function Update () {
		if (alive == false){
			fire = false;
		}
		lastFire -= Time.deltaTime;
		contactTime -= Time.deltaTime;
		if (contactTime > 0.0){
			sendContact = false;
		}else{
			sendContact = true;
		}


	}
	function dead(time:float){
		alive = false;
	}
