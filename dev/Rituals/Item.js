IDRegistry.genItemID("elementalScribeToolWater");
Item.createItem("elementalScribeToolWater", "Water Scribe Tool", {name: "water_scribe_tool", meta: 0}, {stack: 1});
IDRegistry.genItemID("elementalScribeToolAir");
Item.createItem("elementalScribeToolAir", "Air Scribe Tool", {name: "air_scribe_tool", meta: 0}, {stack: 1});
IDRegistry.genItemID("elementalScribeToolEarth");
Item.createItem("elementalScribeToolEarth", "Earth Scribe Tool", {name: "earth_scribe_tool", meta: 0}, {stack: 1});
IDRegistry.genItemID("elementalScribeToolDusk");
Item.createItem("elementalScribeToolDusk", "Dusk Scribe Tool", {name: "dusk_scribe_tool", meta: 0}, {stack: 1});
IDRegistry.genItemID("elementalScribeToolFire");
Item.createItem("elementalScribeToolFire", "Fire Scribe Tool", {name: "fire_scribe_tool", meta: 0}, {stack: 1});
IDRegistry.genItemID("elementalScribeToolDawn");
Item.createItem("elementalScribeToolDawn", "Dawn Scribe Tool", {name: "dawn_scribe_tool", meta: 0}, {stack: 1});
IDRegistry.genItemID("ritualDiviner");
Item.createItem("ritualDiviner", "Ritual Diviner", {name: "ritualdiviner", meta: 0}, {stack: 1});
IDRegistry.genItemID("weakActivationCrystal");
Item.createItem("weakActivationCrystal", "Weak Activation Crystal", {name: "crystal_weak", meta: 0}, {stack: 1});
IDRegistry.genItemID("boundAxeDeactive");
Item.createItem("boundAxeDeactive", "Bound Axe", {name: "bound_tool", meta: 0}, {stack: 1, isTech:true});
IDRegistry.genItemID("boundAxeActive");
Item.createItem("boundAxeActive", "Bound Axe", {name: "boundaxe_activated", meta: 0}, {stack: 1});
IDRegistry.genItemID("boundSwordDeactive");
Item.createItem("boundSwordDeactive", "Bound Sword", {name: "bound_tool", meta: 0}, {stack: 1, isTech:true});
IDRegistry.genItemID("boundSwordActive");
Item.createItem("boundSwordActive", "Bound Sword", {name: "boundsword_activated", meta: 0}, {stack: 1});
IDRegistry.genItemID("boundShovelDeactive");
Item.createItem("boundShovelDeactive", "Bound Shovel", {name: "bound_tool", meta: 0}, {stack: 1, isTech:true});
IDRegistry.genItemID("boundShovelActive");
Item.createItem("boundShovelActive", "Bound Shovel", {name: "boundshovel_activated", meta: 0}, {stack: 1});
IDRegistry.genItemID("boundPickaxeDeactive");
Item.createItem("boundPickaxeDeactive", "Bound Pickaxe", {name: "bound_tool", meta: 0}, {stack: 1, isTech:true});
IDRegistry.genItemID("boundPickaxeActive");
Item.createItem("boundPickaxeActive", "Bound Pickaxe", {name: "boundpickaxe_activated", meta: 0}, {stack: 1});
IDRegistry.genItemID("ritualDivinerDusk");
//Item.createItem("ritualDivinerDusk", "Ritual Diviner Dusk", {name: "ritualdiviner", meta: 0}, {stack: 1});

Translation.addTranslation("Water Scribe Tool", {ru: "Водный Знак"});
Translation.addTranslation("Fire Scribe Tool", {ru: "Огненный Знак"});
Translation.addTranslation("Air Scribe Tool", {ru: "Воздушный Знак"});
Translation.addTranslation("Earth Scribe Tool", {ru: "Земляной Знак"});
Translation.addTranslation("Dawn Scribe Tool", {ru: "Утренний Знак"});
Translation.addTranslation("Dusk Scribe Tool", {ru: "Сумеречный Знак"});
Translation.addTranslation("Ritual Diviner", {ru: "Ритуальный Предсказатель"});
Translation.addTranslation("Weak Activation Crystal", {ru: "Ослабленый Кристал Активации"});
Translation.addTranslation("Ritual Diviner Dusk", {ru: "Ритуальный Предсказатель Сумрака"});

Recipes.addShaped({id: IDData.item.ritualDiviner, count: 1, data: 0}, ["gag", "whf", "geg"], ["g",264,0,"h", 388,0, "a", IDData.item.elementalScribeToolAir,0, "f",IDData.item.elementalScribeToolFire,0,"e",IDData.item.elementalScribeToolEarth,0,"w",IDData.item.elementalScribeToolWater,0],backWorkbench);
AddBloodRecipe(370, 0, 400, 3000, 3, IDData.item.elementalScribeToolAir, 0, function(){});
AddBloodRecipe(49, 0, 400, 3000, 3, IDData.item.elementalScribeToolEarth, 0, function(){});
AddBloodRecipe(378, 0, 400, 3000, 3, IDData.item.elementalScribeToolFire, 0, function(){});
AddBloodRecipe(22, 0, 400, 3000, 3, IDData.item.elementalScribeToolWater, 0, function(){});
AddBloodRecipe(IDData.item.lavaCrystal, 0, 500, 10000, 3, IDData.item.weakActivationCrystal, 0, function(){});

Item.registerUseFunction("elementalScribeToolWater", function(coords, item, block){
	if(block.id == BlockID.ritualStone){
		World.setBlock(coords.x, coords.y, coords.z, BlockID.WaterRitualStone);
	}
});
Item.registerUseFunction("elementalScribeToolEarth", function(coords, item, block){
	if(block.id == BlockID.ritualStone){
		World.setBlock(coords.x, coords.y, coords.z, BlockID.EarthRitualStone);
	}
});
Item.registerUseFunction("elementalScribeToolAir", function(coords, item, block){
	if(block.id == BlockID.ritualStone){
		World.setBlock(coords.x, coords.y, coords.z, BlockID.AirRitualStone);
	}
});
Item.registerUseFunction("elementalScribeToolFire", function(coords, item, block){
	if(block.id == BlockID.ritualStone){
		World.setBlock(coords.x, coords.y, coords.z, BlockID.FireRitualStone);
	}
});
Item.registerUseFunction("elementalScribeToolDusk", function(coords, item, block){
	if(block.id == BlockID.ritualStone){
		World.setBlock(coords.x, coords.y, coords.z, BlockID.DuskRitualStone);
	}
});
Item.registerUseFunction("elementalScribeToolDawn", function(coords, item, block){
	if(block.id == BlockID.ritualStone){
		World.setBlock(coords.x, coords.y, coords.z, BlockID.DownRitualStone);
	}
});

Item.registerUseFunction("ritualDiviner", function(coords, item, block){
	if(block.id!=BlockID.masterRitualStone){
	if(item.data<Ritual.standartRitualArray.length-1){
		Player.setCarriedItem(item.id,item.count, item.data+1);
		Game.message("Current ritual is: "+Ritual.standartRitualArray[item.data+1].name);
	}else{
		Player.setCarriedItem(item.id,item.count, 0);
		Game.message("Current ritual is: "+Ritual.standartRitualArray[0].name);
	}
	}else{	
	for (var i =0; i<36; i++){
		if(Player.getInventorySlot(i).id==BlockID.ritualStone ){
			//Player.setInventorySlot(i).count--;
			for(var i in Ritual.standartRitualArray[item.data].block){
			var block = Ritual.standartRitualArray[item.data].block[i];
			
			if(World.getBlock(coords.x+block.x, coords.y+block.y, coords.z+block.z).id==0&&block.id!=BlockID.DuskRitualStone&&block.id!=BlockID.DawnRitualStone){
				World.setBlock(coords.x+block.x, coords.y+block.y, coords.z+block.z, block.id);
				bloodNetwork.getBlood(20);
				Particles.addFarParticle(Native.ParticleType.happyVillager,coords.x+Math.random(), coords.y+1+Math.random(), coords.z+Math.random());
				Particles.addFarParticle(Native.ParticleType.happyVillager,coords.x+Math.random(), coords.y+1+Math.random(), coords.z+Math.random());
				Particles.addFarParticle(Native.ParticleType.happyVillager,coords.x+Math.random(), coords.y+1+Math.random(), coords.z+Math.random());
				Particles.addFarParticle(Native.ParticleType.happyVillager,coords.x+Math.random(), coords.y+1+Math.random(), coords.z+Math.random());
				Particles.addFarParticle(Native.ParticleType.happyVillager,coords.x+Math.random(), coords.y+1+Math.random(), coords.z+Math.random());
				break;
			}
		}
			break;
		}
	}
	}
});
Item.registerUseFunction("weakActivationCrystal", function(coords, item, block){
	if(block.id==BlockID.imperfectRitualStone){
Ritual.activateWeakRitual(coords.x,coords.y,coords.z);
}
if(block.id==BlockID.masterRitualStone){
Ritual.activateRitual(coords.x,coords.y,coords.z);
}
});


	IDRegistry.genItemID("daggerOfSacrifice");
Item.createItem("daggerOfSacrifice", "Dagger Of Sacrifice", {name: "dagger_of_sacrifice", meta: 0}, {stack: 1});
Translation.addTranslation("Dagger Of Sacrifice", {ru: "Жертвенный кинжал"});

Callback.addCallback("PlayerAttack",function(player, victim){
	var item = Player.getCarriedItem();
	if(item.id==IDData.item.daggerOfSacrifice){
		for(var xx = 0; xx<=4; xx++){
			for(var zz = 0; zz<=4; zz++){
				for(var yy = 0; yy<=4; yy++){
					var x = Math.floor(Entity.getPosition(victim).x+xx-2);
					var y = Math.floor(Entity.getPosition(victim).y+yy-2);
					var z = Math.floor(Entity.getPosition(victim).z+zz-2);
					if(World.getBlock(x, y, z).id==BlockID.bloodAltar){
						Entity.setHealth(victim,1);
					}
				}
			}
		}
	}
});

Callback.addCallback("EntityDeath",function(victim){
	var item = Player.getCarriedItem();
	if(item.id==IDData.item.daggerOfSacrifice){
for(var xx = 0; xx<=10; xx++){
			for(var zz = 0; zz<=10; zz++){
				for(var yy = 0; yy<=10; yy++){
					var x = Math.floor(Entity.getPosition(victim).x+xx-5);
					var y = Math.floor(Entity.getPosition(victim).y+yy-5);
					var z = Math.floor(Entity.getPosition(victim).z+zz-5);
					if(World.getBlock(x, y, z).id==BlockID.bloodAltar){
				//		Entity.setHealth(victim,1);
						if(Entity.getType(victim)==15){
							World.getTileEntity(x,y, z).addBloodOther(2000);
							
							//	Entity.spawn(15, Player.getPosition().x, Player.getPosition().y, Player.getPosition().z,null);
								//ToDO пофиксить молнию
							
						}else if(Entity.getType(victim)<25&&Entity.getType(victim)!=15){
							World.getTileEntity(x,y, z).addBloodOther(250);
						}else if(Entity.getType(victim)<50&&Entity.getType(victim)>25){
							World.getTileEntity(x,y, z).addBloodOther(500);
						}else{
							Game.message("Unknown mob, please report the developer of mod ©Blood Magic");
						}
					}
				}
			}
			}
			}
			});
			
			backItemToWorkbench.addReplace(IDData.item.weakBloodOrb,0,IDData.item.weakBloodOrb,0);
backItemToWorkbench.addReplace(IDData.item.apprenticeBloodOrb,0,IDData.item.apprenticeBloodOrb,0);
backItemToWorkbench.addReplace(IDData.item.magiciansBloodOrb,0,IDData.item.magiciansBloodOrb,0);
backItemToWorkbench.addReplace(IDData.item.masterBloodOrb,0,IDData.item.masterBloodOrb,0);
importLib("Tool", "*");
Callback.addCallback("ItemUse",function(coords, item, block){
if(getSneaking(Player.get())){
	sigilDeactivation(IDData.item.boundAxeActive, IDData.item.boundAxeDeactive, item.id);
	sigilDeactivation(IDData.item.boundSwordActive, IDData.item.boundSwordDeactive, item.id);
	sigilDeactivation(IDData.item.boundPickaxeActive, IDData.item.boundPickaxeDeactive, item.id);
	sigilDeactivation(IDData.item.boundShovelActive, IDData.item.boundShovelDeactive, item.id);
}
});
					Callback.addCallback("tick",function(){
						
sigilActivation(ItemID.boundSwordActive, function(){
	if(World.getWorldTime()%20==0&&bloodNetwork.getBlood(1)){
		
	}
});
});
function ShovelDig(coords){
		for(var xx = 0; xx<14; xx++){
		for(var yy = 0; yy<14; yy++){
			for(var zz = 0; zz<14; zz++){
				var x = coords.x+xx-6;
				var y = coords.y+yy;
				var z = coords.z+zz-6;
				if(ToolAPI.blockData[World.getBlock(x,y,z).id]!==undefined){
				if(ToolAPI.blockData[World.getBlock(x,y,z).id].material.name=="dirt"){
					World.destroyBlock(x, y, z, true);
				}
				}
			}
		}
	}
	}
Tool.add (ItemID.boundPickaxeActive, ['stone'], {
	material: 'diamond',
	damage: 1, 
	enchant: {
		type: Native.EnchantType.pickaxe,
		max: 50
	}
});
Tool.add (ItemID.boundAxeActive, ['wood'], {
	material: 'diamond',
	damage: 2, 
	enchant: {
		type: Native.EnchantType.axe,
		max: 50
	}
});
Tool.add (ItemID.boundShovelActive, ['dirt'], {
	material: 'diamond',
	damage: 0, 
	enchant: {
		type: Native.EnchantType.shovel,
		max: 50
	}
});
Tool.add (ItemID.boundSwordActive, ['plant', 'corweb'], {
	isWeapon: true,
	material: 'diamond',
	damage: 10,
	enchant: {
		type: Native.EnchantType.weapon,
		max: 50
	}
});
Callback.addCallback("DestroyBlock",function(coords, block, player){
	if(Player.getCarriedItem().id==ItemID.boundAxeActive||Player.getCarriedItem().id==ItemID.boundPickaxeActive||Player.getCarriedItem().id==ItemID.boundShovelActive){
		if(getSneaking(Player.get())){
			if(Player.getCarriedItem().id==ItemID.boundAxeActive&&bloodNetwork.getBlood(10000)){
	for(var xx = 0; xx<14; xx++){
		for(var yy = 0; yy<14; yy++){
			for(var zz = 0; zz<14; zz++){
				var x = coords.x+xx-6;
				var y = coords.y+yy;
				var z = coords.z+zz-6;
				if(ToolAPI.blockData[World.getBlock(x,y,z).id]!==undefined){
				if(ToolAPI.blockData[World.getBlock(x,y,z).id].material.name=="wood"){
					World.destroyBlock(x, y, z, true);
				}
				}
			}
		}
	}
		}
		if(Player.getCarriedItem().id==ItemID.boundShovelActive&&bloodNetwork.getBlood(10000)){
			ShovelDig(coords);
		}
		if(Player.getCarriedItem().id==ItemID.boundPickaxeActive&&bloodNetwork.getBlood(10000)){
	for(var xx = 0; xx<14; xx++){
		for(var yy = 0; yy<14; yy++){
			for(var zz = 0; zz<14; zz++){
				var x = coords.x+xx-6;
				var y = coords.y+yy;
				var z = coords.z+zz-6;
				if(ToolAPI.blockData[World.getBlock(x,y,z).id]!==undefined){
				if(ToolAPI.blockData[World.getBlock(x,y,z).id].material.name=="stone"){
					World.destroyBlock(x, y, z, true);
				}
				}
			}
		}
	}
		}
		}else{
		if(Player.getCarriedItem().id==ItemID.boundAxeActive){
			bloodNetwork.getBlood(100);
		}
		if(Player.getCarriedItem().id==ItemID.boundShovelActive){
			bloodNetwork.getBlood(250);
		}
		if(Player.getCarriedItem().id==ItemID.boundPickaxeActive){
			bloodNetwork.getBlood(5);
		}
		}
	}
	});
Callback.addCallback("PlayerAttack",function(player, victim){
	if(Player.getCarriedItem().id==ItemID.boundSwordActive){
		bloodNetwork.getBlood(50);
	}
});
Callback.addCallback("EntityDeath",function(victim){
	if(Player.getCarriedItem().id==ItemID.boundSwordActive){
		if(Math.random()>0.9){
			World.drop(Entity.getPosition(victim).x,Entity.getPosition(victim).y,Entity.getPosition(victim).z,ItemID.weakBloodShard,1,0);
		}
	}
});