var binding={};
var Ritual={
	RitualArray:[],
	standartRitualArray:[],
	addRitual:function(array, LPActivation, LPcost, define, name, isLong){
		this.standartRitualArray.push({LP:LPActivation, cost:LPcost, define:define, block:array, name:name, time:isLong});
	},
	addWeakRitual:function(id,data, LP, define){
		this.RitualArray.push([{x:0,y:0, z:0, id:IDData.block.imperfectRitualStone, data:0, LP:LP, define:define},{x:0, y:1, z:0, id:id, data:data}]);
	},
	activateRitual:function(x,y,z){
		for(var i in this.standartRitualArray){
			var exist = true;
			for(var it =0; it < this.standartRitualArray[i].block.length; it++){
				if(World.getBlock(x+this.standartRitualArray[i].block[it].x,y+this.standartRitualArray[i].block[it].y,z+this.standartRitualArray[i].block[it].z).id!=this.standartRitualArray[i].block[it].id){
					exist=false;
				}
				if(World.getBlock(x+this.standartRitualArray[i].block[it].x,y+this.standartRitualArray[i].block[it].y,z+this.standartRitualArray[i].block[it].z).id&&exist&&this.standartRitualArray[i].block.length==it+1){
					this.standartRitualArray[i].define(x,y,z);
					//Game.message("Ritual "+this.standartRitualArray[i].name+" was created!");
					bloodNetwork.getBlood(this.standartRitualArray[i].LP);
				}
			}
		}
	},
	activateWeakRitual:function(x,y,z){
		for(var i in this.RitualArray){
			var exist = true;
			for(var it =0; it < this.RitualArray[i].length; it++){
				if(World.getBlock(x+this.RitualArray[i][it].x,y+this.RitualArray[i][it].y,z+this.RitualArray[i][it].z).id!=this.RitualArray[i][it].id){
					exist=false;
				}
				if(World.getBlock(x+this.RitualArray[i][it].x,y+this.RitualArray[i][it].y,z+this.RitualArray[i][it].z).id&&exist&&this.RitualArray[i].length==it+1&&bloodNetwork.getBlood(this.RitualArray[i][0].LP)){
					this.RitualArray[i][0].define(x,y,z);
					
					
				}
			}
		}
	},
	checkRitual:function(x,y,z){
		for(var i in this.standartRitualArray){
			var exist = true;
			for(var it =0; it < this.standartRitualArray[i].block.length; it++){
				if(World.getBlock(x+this.standartRitualArray[i].block[it].x,y+this.standartRitualArray[i].block[it].y,z+this.standartRitualArray[i].block[it].z).id!=this.standartRitualArray[i].block[it].id){
					exist=false;
				}
				if(World.getBlock(x+this.standartRitualArray[i].block[it].x,y+this.standartRitualArray[i].block[it].y,z+this.standartRitualArray[i].block[it].z).id!=this.standartRitualArray[i].block[it].id&&this.standartRitualArray.length==(i+1)){
					return null;
				}
				if(World.getBlock(x+this.standartRitualArray[i].block[it].x,y+this.standartRitualArray[i].block[it].y,z+this.standartRitualArray[i].block[it].z).id&&exist&&this.standartRitualArray[i].block.length==it+1){
					return this.standartRitualArray[i];
				}
			}
		}
		return null;
	},
	ritualByName:function(name){
		for(var i in this.standartRitualArray){
			if(this.standartRitualArray[i].name==name){
				return this.standartRitualArray[i];
			}
		}
	}
};
var setRainLevel = ModAPI.requireGlobal("Level.setRainLevel");
Ritual.addWeakRitual(7,0, 5000, function(){
			Entity.addEffect(Player.get(), Native.PotionEffect.damageResistance, 1200, 1, true, true);
		});
		Ritual.addWeakRitual(9,0, 5000, function(){
			setRainLevel(2);
		});
		Ritual.addWeakRitual(173,0, 5000, function(x,y,z){
			//var m =Entity.spawn(32, x, y, z);
			//Entity.setHealth(m, 100);
			//TODO Пофиксить
		});
		Ritual.addWeakRitual(22,0, 5000, function(){
			setNightMode(true);
		});
		
		Ritual.addRitual([{x:-1, y:0, z:-1, id:BlockID.WaterRitualStone, data:0},{x:+1, y:0, z:-1, id:BlockID.WaterRitualStone, data:0},{x:1, y:0, z:1, id:BlockID.WaterRitualStone, data:0},{x:-1, y:0, z:1, id:BlockID.WaterRitualStone, data:0}],500,10, function(x,y,z){
			if(World.getWorldTime()%5==0){
				if(World.getBlock(x,y+1,z).id==0&&bloodNetwork.getBlood(25)){
					World.setBlock(x,y+1,z,8);
					
					addBloodParticle(x, y+1, z , 10);
				}
			}
		},"Ritual of the Full Spring", true);
		Ritual.addRitual([{x:0, y:0, z:-1, id:BlockID.FireRitualStone, data:0},{x:1, y:0, z:0, id:BlockID.FireRitualStone, data:0},{x:0, y:0, z:1, id:BlockID.FireRitualStone, data:0},{x:-1, y:0, z:0, id:BlockID.FireRitualStone, data:0}],10000,10, function(x,y,z){
			if(World.getWorldTime()%5==0){
				if(World.getBlock(x,y+1,z).id==0&&bloodNetwork.getBlood(500)){
					World.setBlock(x,y+1,z,10);
					
				}
			}
		},"Serenade of the Nether", true);
		Ritual.addRitual([{x:0, y:0, z:-1, id:BlockID.AirRitualStone, data:0},{x:1, y:0, z:0, id:BlockID.AirRitualStone, data:0},{x:0, y:0, z:1, id:BlockID.AirRitualStone, data:0},{x:-1, y:0, z:0, id:BlockID.AirRitualStone, data:0},{x:-1, y:0, z:-1, id:BlockID.AirRitualStone, data:0},{x:+1, y:0, z:-1, id:BlockID.AirRitualStone, data:0},{x:1, y:0, z:1, id:BlockID.AirRitualStone, data:0},{x:-1, y:0, z:1, id:BlockID.AirRitualStone, data:0}],1000,10, function(x,y,z){
			if(World.getWorldTime()%2==0){
				var mobs=Entity.getAll();
				for(var t =0; t<mobs.length; t++){
					if(Entity.getType(mobs[t])<60){
					var xx=Entity.getPosition(mobs[t]).x-x;
					var yy=Entity.getPosition(mobs[t]).y-y;
					var zz=Entity.getPosition(mobs[t]).z-z;
					if(bloodNetwork.getBlood(1)){
						pull(Entity.getType(mobs[t]),6,0.3, xx,yy,zz);
					}
					}
					}
					}
			
		},"Interdiction Ritual", true);
		Ritual.addRitual([{x:0, y:0, z:-1, id:BlockID.EarthRitualStone, data:0},{x:1, y:0, z:0, id:BlockID.EarthRitualStone, data:0},{x:0, y:0, z:1, id:BlockID.EarthRitualStone, data:0},{x:-1, y:0, z:0, id:BlockID.EarthRitualStone, data:0},{x:-2, y:0, z:-2, id:BlockID.EarthRitualStone, data:0},{x:+2, y:0, z:-2, id:BlockID.EarthRitualStone, data:0},{x:2, y:0, z:2, id:BlockID.EarthRitualStone, data:0},{x:-2, y:0, z:2, id:BlockID.EarthRitualStone, data:0},
		{x:0, y:5, z:-1, id:BlockID.EarthRitualStone, data:0},{x:1, y:5, z:0, id:BlockID.EarthRitualStone, data:0},{x:0, y:5, z:1, id:BlockID.EarthRitualStone, data:0},{x:-1, y:5, z:0, id:BlockID.EarthRitualStone, data:0},{x:-2, y:5, z:-2, id:BlockID.EarthRitualStone, data:0},{x:+2, y:5, z:-2, id:BlockID.EarthRitualStone, data:0},{x:2, y:5, z:2, id:BlockID.EarthRitualStone, data:0},{x:-2, y:5, z:2, id:BlockID.EarthRitualStone, data:0}
		],2000,10, function(x,y,z){
			if(World.getWorldTime()%2==0){
				var mobs=Entity.getAll();
				for(var t =0; t<mobs.length; t++){
					if(Entity.getType(mobs[t])<60){
					if(bloodNetwork.getBlood(1)){
						pull(Entity.getType(mobs[t]),6,-0.3, xx,yy,zz);
					}
					}
					}
					}
			
		},"Ritual of Containment", true);
		Ritual.addRitual([{x:-1, y:0, z:-1, id:BlockID.AirRitualStone, data:0},{x:1, y:0, z:-1, id:BlockID.AirRitualStone, data:0},{x:1, y:0, z:1, id:BlockID.AirRitualStone, data:0},{x:-1, y:0, z:1, id:BlockID.AirRitualStone, data:0},
		{x:-1, y:1, z:-1, id:BlockID.AirRitualStone, data:0},{x:1, y:1, z:-1, id:BlockID.AirRitualStone, data:0},{x:1, y:1, z:1, id:BlockID.AirRitualStone, data:0},{x:-1, y:1, z:1, id:BlockID.AirRitualStone, data:0},
		{x:-1, y:-1, z:-1, id:BlockID.AirRitualStone, data:0},{x:1, y:-1, z:-1, id:BlockID.AirRitualStone, data:0},{x:1, y:-1, z:1, id:BlockID.AirRitualStone, data:0},{x:-1, y:-1, z:1, id:BlockID.AirRitualStone, data:0}
		],1000,10, function(x,y,z){
			var mobs=Entity.getAll();
				for(var t =0; t<mobs.length; t++){
			if(Math.floor(Entity.getPosition(mobs[t]).x)==x&&Math.floor(Entity.getPosition(mobs[t]).z)==z&&Entity.getVelocity(mobs[t]).y<-0.6){
				if(World.getBlock(Math.floor(Entity.getPosition(mobs[t]).x),Math.floor(Entity.getPosition(mobs[t]).y)-3,Math.floor(Entity.getPosition(mobs[t]).z)).id==BlockID.masterRitualStone||World.getBlock(Math.floor(Entity.getPosition(mobs[t]).x),Math.floor(Entity.getPosition(mobs[t]).y)-2,Math.floor(Entity.getPosition(mobs[t]).z)).id==BlockID.masterRitualStone||World.getBlock(Math.floor(Entity.getPosition(mobs[t]).x),Math.floor(Entity.getPosition(mobs[t]).y)-4,Math.floor(Entity.getPosition(mobs[t]).z)).id==BlockID.masterRitualStone){
					Entity.addEffect(mobs[t], Native.PotionEffect.jump, 3, 10, true, true);
				}
			}
			}
			if(World.getWorldTime()%5==0){
				var mobs=Entity.getAll();
				for(var t =0; t<mobs.length; t++){
					if(Entity.getType(mobs[t])<60||Player.isPlayer(mobs[t])){
						if(Math.floor(Entity.getPosition(mobs[t]).x)==x&&Math.floor(Entity.getPosition(mobs[t]).z)==z){
							if(Entity.getPosition(mobs[t]).y>y&&Entity.getPosition(mobs[t]).y<y+2||Player.isPlayer(mobs[t])&&Player.getPosition().y>y&&Player.getPosition().y<y+4){
								if(bloodNetwork.getBlood(10)){
									Entity.setVelocity(mobs[t],0,1.5,0);
								}
							}
						}
						}
						}
			}
		},"Ritual of High Jump", true);
		
		Ritual.addRitual([{x:0, y:0, z:-3, id:BlockID.FireRitualStone, data:0},{x:0, y:0, z:3, id:BlockID.FireRitualStone, data:0},{x:3, y:0, z:0, id:BlockID.FireRitualStone, data:0},{x:-3, y:0, z:0, id:BlockID.FireRitualStone, data:0},
		{x:0, y:1, z:-4, id:BlockID.ritualStone, data:0},{x:0, y:1, z:4, id:BlockID.ritualStone, data:0},{x:4, y:1, z:0, id:BlockID.ritualStone, data:0},{x:-4, y:1, z:0, id:BlockID.ritualStone, data:0},
		{x:0, y:2, z:-4, id:BlockID.WaterRitualStone, data:0},{x:0, y:2, z:4, id:BlockID.WaterRitualStone, data:0},{x:4, y:2, z:0, id:BlockID.WaterRitualStone, data:0},{x:-4, y:2, z:0, id:BlockID.WaterRitualStone, data:0},
		{x:-2, y:0, z:-2, id:BlockID.AirRitualStone, data:0},{x:2, y:0, z:2, id:BlockID.AirRitualStone, data:0},{x:2, y:0, z:-2, id:BlockID.AirRitualStone, data:0},{x:-2, y:0, z:2, id:BlockID.AirRitualStone, data:0},
		{x:-3, y:1, z:-3, id:BlockID.ritualStone, data:0},{x:3, y:1, z:3, id:BlockID.ritualStone, data:0},{x:3, y:1, z:-3, id:BlockID.ritualStone, data:0},{x:-3, y:1, z:3, id:BlockID.ritualStone, data:0},
		{x:-3, y:2, z:-3, id:BlockID.EarthRitualStone, data:0},{x:3, y:2, z:3, id:BlockID.EarthRitualStone, data:0},{x:3, y:2, z:-3, id:BlockID.EarthRitualStone, data:0},{x:-3, y:2, z:3, id:BlockID.EarthRitualStone, data:0},
		],2000,10, function(x,y,z){
			var drop = Entity.findNearest({x: x + .5, y: y + 1.2, z: z + .5}, 64, .5);
				if (drop&&!binding.timer){
					var slot = Entity.getDroppedItem(drop);
					//Game.message("u");
					if(slot.id==276&&slot.data==0){
						binding={x:x, y:y,z:z, timer:400, mob:drop, id:ItemID.boundSwordDeactive};
					}
					if(slot.id==277&&slot.data==0){
						binding={x:x, y:y,z:z, timer:400, mob:drop, id:ItemID.boundShovelDeactive};
					}
					if(slot.id==279&&slot.data==0){
						binding={x:x, y:y,z:z, timer:400, mob:drop, id:ItemID.boundAxeDeactivective};
					}
					if(slot.id==278&&slot.data==0){
						binding={x:x, y:y,z:z, timer:400, mob:drop, id:ItemID.boundPickaxeDeactivective};
					}
					}
		},"Ritual of Binding", false);
		Callback.addCallback("tick",function(){
			if(binding.timer&&!Entity.isExist(binding.mob)){
				binding.timer=0;
			}
			var timer = binding.timer;
			if(binding.timer>300){
				binding.timer--;
				Particles.addFarParticle(9,binding.x+Math.random()+4, binding.y+2+Math.random()*2+(timer-300)/10, binding.z+Math.random(), 0, -10, 0,1);
				Particles.addFarParticle(9,binding.x+Math.random()-4, binding.y+2+Math.random()*2+(timer-300)/10, binding.z+Math.random(), 0, -10, 0,1);
				Particles.addFarParticle(9,binding.x+Math.random(), binding.y+2+Math.random()*2+(timer-300)/10, binding.z+Math.random()+4, 0, -10, 0,1);
				Particles.addFarParticle(9,binding.x+Math.random(), binding.y+2+Math.random()*2+(timer-300)/10, binding.z+Math.random()-4, 0, -10, 0,1);
				Particles.addFarParticle(9,binding.x+Math.random()+3, binding.y+2+Math.random()*2+(timer-300)/10, binding.z+Math.random()+3, 0, -10, 0,1);
				Particles.addFarParticle(9,binding.x+Math.random()-3, binding.y+2+Math.random()*2+(timer-300)/10, binding.z+Math.random()+3, 0, -10, 0,1);
				Particles.addFarParticle(9,binding.x+Math.random()+3, binding.y+2+Math.random()*2+(timer-300)/10, binding.z+Math.random()-3, 0, -10, 0,1);
				Particles.addFarParticle(9,binding.x+Math.random()-3, binding.y+2+Math.random()*2+(timer-300)/10, binding.z+Math.random()-3, 0, -10, 0,1);
			}
			if(timer>200&&timer<301){
				binding.timer--;
				Particles.addFarParticle(7,binding.x+Math.random()+4, binding.y+3, binding.z+Math.random(), 0, 0.2, 0,1);
				Particles.addFarParticle(7,binding.x+Math.random()-4, binding.y+3, binding.z+Math.random(), 0, 0.2, 0,1);
				Particles.addFarParticle(7,binding.x+Math.random(), binding.y+2+1, binding.z+Math.random()+4, 0, 0.2, 0,1);
				Particles.addFarParticle(7,binding.x+Math.random(), binding.y+2+1, binding.z+Math.random()-4, 0, 0.2, 0,1);
				Particles.addFarParticle(7,binding.x+Math.random()+3, binding.y+2+1, binding.z+Math.random()+3, 0, 0.2, 0,1);
				Particles.addFarParticle(7,binding.x+Math.random()-3, binding.y+2+1, binding.z+Math.random()+3, 0, 0.2, 0,1);
				Particles.addFarParticle(7,binding.x+Math.random()+3, binding.y+2+1, binding.z+Math.random()-3, 0, 0.2, 0,1);
				Particles.addFarParticle(7,binding.x+Math.random()-3, binding.y+2+1, binding.z+Math.random()-3, 0, 0.2, 0,1);
				if(timer==230){
					World.setBlock(binding.x+4, binding.y+3, binding.z, 51);
				}
				if(timer==223){
					World.setBlock(binding.x, binding.y+3, binding.z+4, 51);
				}
				if(timer==217){
					World.setBlock(binding.x-4, binding.y+3, binding.z, 51);
				}
				if(timer==212){
					World.setBlock(binding.x, binding.y+3, binding.z-4, 51);
				}
				if(timer==210){
					World.setBlock(binding.x+3, binding.y+3, binding.z+3, 51);
				}
				if(timer==207){
					World.setBlock(binding.x-3, binding.y+3, binding.z+3, 51);
				}
				if(timer==204){
					World.setBlock(binding.x+3, binding.y+3, binding.z-3, 51);
				}
				if(timer==201){
					World.setBlock(binding.x-3, binding.y+3, binding.z-3, 51);
				}
			}
			if(timer<201&&timer>100){
				binding.timer--;
				var x = binding.x;
				var y = binding.y;
				var z = binding.z;
				var modi = (timer-100)/100;
				Particles.addFarParticle(10,x+4*modi, y+3*modi, z+.5, 0, 0.2, 0,1);
				Particles.addFarParticle(10,x-4*modi+1, y+3*modi, z+.5, 0, 0.2, 0,1);
				Particles.addFarParticle(10,x+.5, y+3*modi, z+4*modi, 0, 0.2, 0,1);
				Particles.addFarParticle(10,x+.5, y+3*modi, z-4*modi+1, 0, 0.2, 0,1);
				Particles.addFarParticle(10,x+4*modi, y+3*modi, z+4*modi, 0, 0.2, 0,1);
				Particles.addFarParticle(10,x-4*modi+1, y+3*modi, z-4*modi+1, 0, 0.2, 0,1);
				Particles.addFarParticle(10,x-4*modi+1, y+3*modi, z+4*modi, 0, 0.2, 0,1);
				Particles.addFarParticle(10,x+4*modi, y+3*modi, z-4*modi+1, 0, 0.2, 0,1);
			}
			if(timer<115&&timer>19){
				var x = binding.x;
				var y = binding.y;
				var z = binding.z;
				binding.timer--;
				Particles.addFarParticle(10,x+.5+1*((80-timer)/100), y+1.4, z+.5+1*((80-timer)/100), 0, 0, 0,1);
				Particles.addFarParticle(10,x+.5-1*((80-timer)/100), y+1.4, z+.5+1*((80-timer)/100), 0, 0, 0,1);
				Particles.addFarParticle(10,x+.5+1*((80-timer)/100), y+1.4, z+.5-1*((80-timer)/100), 0, 0, 0,1);
				Particles.addFarParticle(10,x+.5-1*((80-timer)/100), y+1.4, z+.5-1*((80-timer)/100), 0, 0, 0,1);
				Particles.addFarParticle(10,x+.5+1*((80-timer)/100), y+1.4, z+.5, 0, 0, 0,1);
				Particles.addFarParticle(10,x+.5-1*((80-timer)/100), y+1.4, z+.5, 0, 0, 0,1);
				Particles.addFarParticle(10,x+.5, y+1.4, z+.5-1*((80-timer)/100), 0, 0, 0,1);
				Particles.addFarParticle(10,x+.5,y+1.4, z+.5+1*((80-timer)/100), 0, 0, 0,1);
				
				Particles.addFarParticle(10,x+.5+1/2*((80-timer)/100), y+1+.5*((80-timer)/100), z+.5+1/2*((80-timer)/100));
				Particles.addFarParticle(10,x+.5-1/2*((80-timer)/100), y+1+.5*((80-timer)/100), z+.5+1/2*((80-timer)/100));
				Particles.addFarParticle(10,x+.5+1/2*((80-timer)/100), y+1+.5*((80-timer)/100), z+.5-1/2*((80-timer)/100));
				Particles.addFarParticle(10,x+.5-1/2*((80-timer)/100), y+1+.5*((80-timer)/100), z+.5-1/2*((80-timer)/100));
				Particles.addFarParticle(10,x+.5+1/2*((80-timer)/100), y+1+.5*((80-timer)/100), z+.5);
				Particles.addFarParticle(10,x+.5-1/2*((80-timer)/100), y+1+.5*((80-timer)/100), z+.5);
				Particles.addFarParticle(10,x+.5, y+1+.5*((80-timer)/100), z+.5-1/2*((80-timer)/100));
				Particles.addFarParticle(10,x+.5,y+1+.5*((80-timer)/100), z+.5+1/2*((80-timer)/100));
			}
			if(timer==20){
				binding.timer=0;
				Entity.remove(binding.mob);
				World.drop(x+.5, y+1, z+.5,binding.id,1,0);
			}
		});
var ore = [14, 15, 16, 21, 56, 73, 129, 153];
							function getOre(x,y,z){
								for(var i in ore){
									if(World.getBlock(x,y,z).id==ore[i]){
										return ore[i];
									}
								}
								return false;
							}
Ritual.addRitual([{x:-1, y:0, z:-1, id:BlockID.EarthRitualStone, data:0},{x:1, y:0, z:1, id:BlockID.EarthRitualStone, data:0},{x:-1, y:0, z:1, id:BlockID.EarthRitualStone, data:0},{x:1, y:0, z:-1, id:BlockID.EarthRitualStone, data:0},
{x:2, y:1, z:0, id:BlockID.EarthRitualStone, data:0},{x:-2, y:1, z:0, id:BlockID.EarthRitualStone, data:0},{x:0, y:1, z:2, id:BlockID.EarthRitualStone, data:0},{x:0, y:1, z:-2, id:BlockID.EarthRitualStone, data:0},
{x:2, y:2, z:0, id:BlockID.FireRitualStone, data:0},{x:-2, y:2, z:0, id:BlockID.FireRitualStone, data:0},{x:0, y:2, z:2, id:BlockID.FireRitualStone, data:0},{x:0, y:2, z:-2, id:BlockID.FireRitualStone, data:0},
{x:2, y:1, z:2, id:BlockID.AirRitualStone, data:0},{x:-2, y:1, z:2, id:BlockID.AirRitualStone, data:0},{x:2, y:1, z:-2, id:BlockID.AirRitualStone, data:0},{x:-2, y:1, z:-2, id:BlockID.AirRitualStone, data:0}
		],5000,10, function(xx,yy,zz){
			if(World.getWorldTime()%40==0&&bloodNetwork.getBlood(100)){
				var Block = {id:100};
				close:
				for(var y = 1; y<4; y++){
					for(var x = -1; x<2; x++){
						for(var z = -1; z<2; z++){
							if(World.getBlock(x+xx,y+yy,z+zz).id==0){
								Block.id=0;
								Block.x=x+xx;
								Block.y=y+yy;
								Block.z=z+zz;
								break close;
							}
						}
					}
				}
				close:
				for(var y=yy-1; y>0; y--){
					for(var x = -1; x<2; x++){
						for(var z = -1; z<2; z++){
							var blockOre = getOre(x+xx, y, z+zz);
							
							if(blockOre&&Block.id==0){
								World.setBlock(Block.x, Block.y, Block.z, blockOre);
								World.setBlock(x+xx, y, z+zz, 0);
								Block.id=blockOre;
								break close;
							}
						}
					}
				}
			}
		},"Ritual of Magnetism", true);
