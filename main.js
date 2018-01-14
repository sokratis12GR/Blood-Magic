/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 20
*/



// file: main_code.js

Callback.addCallback("LevelLoaded",function(){
	Game.message("Мод создан SlenderPE, группа мода: https://vk.com/blood_magic_pe");
	Game.message("Mod was created by SlenderPE, group of mod: https://vk.com/blood_magic_pe");
});
/*var LpModified = __config__.access("blood_altar.LpModified");*/




// file: BloodCore.js

var playerBloodMaxAmount=0;
var playerBloodAmount=0;
Saver.addSavesScope("playerBloodMaxAmount",
	function read(scope){
		if(scope&&scope.amount)playerBloodMaxAmount = scope.amount;
	},
	
	function save(){
		return {amount:playerBloodMaxAmount};
	}
);
Saver.addSavesScope("playerBloodAmount",
 function read(scope){
 if(scope&&scope.amount)playerBloodAmount = scope.amount;
 },
 
 function save(){
  return {amount: playerBloodAmount};
 }
);
var bloodNetwork={
	addBlood:function(count){
		playerBloodAmount= Math.min(playerBloodAmount+count, playerBloodMaxAmount);
	},
	getBlood:function(count){
		if(count>playerBloodAmount){
			return false;
		}
		if(count<=playerBloodAmount){
			playerBloodAmount-=count;
			return true;
		}
	},
	getAmountBlood:function(){
		return playerBloodAmount;
	},
	getMaxBloodAmount:function(){
		return playerBloodMaxAmount;
	},
	setBloodAmount:function(count){
		playerBloodAmount=count;
	},
	addMaxBloodAmount:function(count){
		playerBloodMaxAmount+=count;
	},
	getMaxBlood:function(count){
		playerBloodMaxAmount=Math.max(playerBloodMaxAmount-= count*maxBlood,0);
	}
};

function addBloodParticle(x,y,z, count){
	for( var i = 0; i<=count; i++){
		Particles.addFarParticle(10,x+Math.random(), y+Math.random()/2, z+Math.random());
	}
}

var replaceInWorkbench =[];
var backItemToWorkbench={
	addReplace:function(id, data, Id, Data){
		replaceInWorkbench.push({id:id, data:data, replaceId:Id, replaceData:Data});
	},
	getReplace:function(id, data){
		for(var i in replaceInWorkbench){
			if(replaceInWorkbench[i].id==id&&replaceInWorkbench[i].data==data){
				return {id:replaceInWorkbench[i].replaceId,data:replaceInWorkbench[i].replaceData};
			}
		}
	},
	getReplaceable:function(id, data){
		for(var i in replaceInWorkbench){
			if(replaceInWorkbench[i].id==id&&replaceInWorkbench[i].data==data){
				return true;
			}
		}
	}
};
var backWorkbench = function(api, field, result){
	for (var i in field){
		var id =field[i].id;
			var data =field[i].data;
		
		if(backItemToWorkbench.getReplaceable(field[i].id, field[i].data)){
			//Player.addItemToInventory(backItemToWorkbench.getReplace(field[i].id, field[i].data).id, 1, backItemToWorkbench.getReplace(field[i].id,field[i].data).data);
			field[i].id=backItemToWorkbench.getReplace(field[i].id, field[i].data).id;
			field[i].data=backItemToWorkbench.getReplace(field[i].id, field[i].data).data;
			/*field[i].id=field[i].replaceId;
			field[i].data=field[i].replaceData;*/
		}else{
			api.decreaseFieldSlot(i);
		}
	};
}

backItemToWorkbench.addReplace(325,8,325,0);
backItemToWorkbench.addReplace(325,10,325,0);

var altarBloodRecipe =[];
function AddBloodRecipe(id, data, time, blood, tier, resultId, resultData, define){
	altarBloodRecipe.push({id:id, data:data, time:time, blood:blood, tier:tier, resultId:resultId, resultData:resultData, define:define});
}
var getGameMode = ModAPI.requireGlobal("Level.getGameMode");

function sigilDeactivation(id, id2, click){
	if(click==id){
		Player.setCarriedItem(id2,1,0);
	}
	if(click==id2){
		Player.setCarriedItem(id,1,0);
	}
}

function sigilActivation(id, define){
	for (var i =0; i<36; i++){
		if(Player.getInventorySlot(i).id==id){
			define();
		}
	}
}

function pull(id,r,speed, X, Y, Z){
	var mobs=Entity.getAll();
for(var i =0; i<mobs.length; i++){
if(Entity.getType(mobs[i])==id){
	
var x=Entity.getPosition(mobs[i]).x-X;
var y=Entity.getPosition(mobs[i]).y-Y;
var z=Entity.getPosition(mobs[i]).z-Z;
if(x*x+y*y+z*z<r*r){
	Entity.setVelocity (mobs[i],x*speed, y*speed, z*speed);
	return true;
	}
	}
	}
	}


var getSneaking = ModAPI.requireGlobal("Entity.isSneaking");
var phantomArray=[];
var replaceLiquid=[];




// file: UsefulItems/SacrificialKnife.js

IDRegistry.genItemID("sacrificialKnife");
Item.createItem("sacrificialKnife", "Sacrificial Knife", {name: "dagger", meta: 0}, {stack: 1});

Translation.addTranslation("Sacrificial Knife", {ru: "Жертвенный Нож"});

Recipes.addShaped({id: IDData.item.sacrificialKnife, count: 1, data: 0}, ["ggg", "aog", "iag"], ["g",20,0,"o", 266,0, "i",265,0]);

Item.registerUseFunction("sacrificialKnife", function(coords, item, block){
		
	if(block.id==IDData.block.bloodAltar){
		addBloodParticle(coords.x,coords.y+1,coords.z,12);
		World.getTileEntity(coords.x, coords.y, coords.z).addBlood(200);
		if(getGameMode()==0){
			Entity.setHealth(Player.get(),Entity.getHealth(Player.get())-2);
			}
	}
});




// file: ResourceItem/bloodShard.js

IDRegistry.genItemID("weakBloodShard");
Item.createItem("weakBloodShard", "Weak Blod Shard", {name: "weak_blood_shard", meta: 0}, {stack: 64});
Translation.addTranslation("Weak Blood Shard", {ru: "Ослабленый Осколок Души"});
//TODO сделать его выпадение




// file: UsefulItems/BloodOrb.js

IDRegistry.genItemID("weakBloodOrb");
Item.createItem("weakBloodOrb", "Weak Blood Orb", {name: "Weak", meta: 0}, {stack: 1});

Translation.addTranslation("Weak Blood Orb", {ru: "Ослабленый Кровавый Шар"});

AddBloodRecipe(264, 0, 200, 2000, 1, IDData.item.weakBloodOrb, 0, function(){
	bloodNetwork.addMaxBloodAmount(5000);
});

Item.registerUseFunction("weakBloodOrb", function(coords, item, block){
		bloodNetwork.addBlood(200);
		if(getGameMode()==0){
			Entity.setHealth(Player.get(),Entity.getHealth(Player.get())-2);
			}
});

IDRegistry.genItemID("apprenticeBloodOrb");
Item.createItem("apprenticeBloodOrb", "Apprentice Blood Orb", {name: "Apprentice", meta: 0}, {stack: 1});
Translation.addTranslation("Apprentice Blood Orb", {ru: "Кровавый Шар Ученика"});
Item.registerUseFunction("apprenticeBloodOrb", function(coords, item, block){
		bloodNetwork.addBlood(200);
		if(getGameMode()==0){
			Entity.setHealth(Player.get(),Entity.getHealth(Player.get())-2);
			}
});
AddBloodRecipe(388, 0, 500, 5000, 2, IDData.item.apprenticeBloodOrb, 0, function(){
	bloodNetwork.addMaxBloodAmount(25000);
});
IDRegistry.genItemID("magiciansBloodOrb");
Item.createItem("magiciansBloodOrb", "Magician's Blood Orb", {name: "ma", meta: 0}, {stack: 1});
Translation.addTranslation("Migician's Blood Orb", {ru: "Чародейский Кровавый Шар"});
Item.registerUseFunction("magiciansBloodOrb", function(coords, item, block){
		bloodNetwork.addBlood(200);
		if(getGameMode()==0){
			Entity.setHealth(Player.get(),Entity.getHealth(Player.get())-2);
			}
});
AddBloodRecipe(41, 0, 2000, 25000, 3, IDData.item.magiciansBloodOrb, 0, function(){
	bloodNetwork.addMaxBloodAmount(150000);
});
IDRegistry.genItemID("masterBloodOrb");
Item.createItem("masterBloodOrb", "Master Blood Orb", {name: "master_blood_orb", meta: 0}, {stack: 1});
Translation.addTranslation("Master Blood Orb", {ru: "Кровавый Шар Волшебника - Мастера"});
Item.registerUseFunction("masterBloodOrb", function(coords, item, block){
		bloodNetwork.addBlood(200);
		if(getGameMode()==0){
			Entity.setHealth(Player.get(),Entity.getHealth(Player.get())-2);
			}
});
AddBloodRecipe(IDData.item.weakBloodShard, 0, 5000, 40000, 4, IDData.item.masterBloodOrb, 0, function(){
	bloodNetwork.addMaxBloodAmount(1000000);
});

Item.registerNoTargetUseFunction("weakBloodOrb", function(item){
 if(getGameMode()==1){
	 bloodNetwork.addMaxBloodAmount(5000);
 }
 });
 
 Item.registerNoTargetUseFunction("apprenticeBloodOrb", function(item){
 if(getGameMode()==1){
	 bloodNetwork.addMaxBloodAmount(25000);
 }
 });
 
 Item.registerNoTargetUseFunction("magiciansBloodOrb", function(item){
 if(getGameMode()==1){
	 bloodNetwork.addMaxBloodAmount(150000);
 }
 });
 
 Item.registerNoTargetUseFunction("masterBloodOrb", function(item){
 if(getGameMode()==1){
	 bloodNetwork.addMaxBloodAmount(1000000);
 }
 });




// file: ResourceItem/slate.js

IDRegistry.genItemID("blankSlate");
Item.createItem("blankSlate", "Blank Slate", {name: "blank_slate", meta: 0}, {});

Translation.addTranslation("Blank Slate", {ru: "Пустая Таблица"});

AddBloodRecipe(1, 0, 200, 1000, 1, IDData.item.blankSlate, 0, function(){});

IDRegistry.genItemID("reinforcedSlate");
Item.createItem("reinforcedSlate", "Reinforced Slate", {name: "reinforced_slate", meta: 0});
Translation.addTranslation("Reinforced Slate", {ru: "Укреплённая таблица"});
AddBloodRecipe(IDData.item.blankSlate, 0, 300, 2000, 2, IDData.item.reinforcedSlate, 0, function(){});
IDRegistry.genItemID("infusedSlate");
Item.createItem("infusedSlate", "Infused Slate", {name: "infused_slate", meta: 0}, {});
Translation.addTranslation("Infused Slate", {ru: "Наполненная Таблица"});
AddBloodRecipe(IDData.item.reinforcedSlate, 0, 400, 5000, 3, IDData.item.infusedSlate, 0, function(){});
IDRegistry.genItemID("demonicSlate");
Item.createItem("demonicSlate", "Demonic Slate", {name: "demon_slate", meta: 0}, {});
Translation.addTranslation("Demonic Slate", {ru: "Демоническая Таблица"});
AddBloodRecipe(IDData.item.infusedSlate, 0, 1000, 15000, 4, IDData.item.demonicSlate, 0, function(){});




// file: ResourceItem/lavaCrystal.js

IDRegistry.genItemID("lavaCrystal");
Item.createItem("lavaCrystal", "Lava Crystal", {name: "lava_crystal", meta: 0}, {stack: 1});

Translation.addTranslation("Lava Crystal", {ru: "Лавовый Кристал"});

Recipes.addShaped({id: IDData.item.lavaCrystal, count: 1, data: 0}, ["glg", "lwl", "oao"], ["g",20,0,"l", 325,10, "w",IDData.item.weakBloodOrb,0, "o",49,0,"a",264,0],backWorkbench);




// file: UsefulItems/Sigil/divinationSigil.js

IDRegistry.genItemID("divinationSigil");
Item.createItem("divinationSigil", "Divination Sigil", {name: "divination_sigil", meta: 0}, {stack: 1});
Translation.addTranslation("Divination Sigil", {ru: "Сигил Предсказания"});

Recipes.addShaped({id: IDData.item.divinationSigil, count: 1, data: 0}, ["ggg", "gsg", "gwg"], ["g",20,0,"s", IDData.item.blankSlate,0, "w",IDData.item.weakBloodOrb,0],backWorkbench);

Item.registerUseFunction("divinationSigil", function(coords, item, block){
		if(block.id!=IDData.block.bloodAltar){
			Game.message("Current Essence: "+bloodNetwork.getAmountBlood()+"LP");
		}else if(block.id==IDData.block.bloodAltar){
			Game.message("Altar's Current Essence: "+World.getTileEntity(coords.x, coords.y, coords.z).data.blood+"LP");
			Game.message("Altar's Current Tier: "+World.getTileEntity(coords.x, coords.y, coords.z).data.tier);
			Game.message("Capacity: "+World.getTileEntity(coords.x, coords.y, coords.z).getBloodStorage());
		}
});




// file: BlockType.js

var BLOCK_TYPE_BLOOD_ALTAR = Block.createSpecialType({
	base: 1,
	opaque: true,
	explosionres: 15,
	destroytime: 2,
	redstoneconsumer: true
});
var BLOCK_TYPE_BLOOD_LAMP = Block.createSpecialType({
	base: 50,
	opaque: false,
	explosionres: 1,
	redstoneconsumer: false,
	lightlevel:13
});
var BLOCK_TYPE_PHANTOM_BLOCK = Block.createSpecialType({
	base: 20,
	opaque: false,
	explosionres: 1,
renderlayer:2
});





// file: Block/AltarRune.js

IDRegistry.genBlockID("bloodRune");
Block.createBlock("bloodRune", [
	{name: "Blood Rune", texture: [["blood_rune", 0]], inCreative: true}
],BLOCK_TYPE_BLOOD_ALTAR);
IDRegistry.genBlockID("speedRune");
Block.createBlock("speedRune", [
	{name: "Speed Rune", texture: [["speed_rune", 0]], inCreative: true}
],BLOCK_TYPE_BLOOD_ALTAR);
IDRegistry.genBlockID("selfSacrificeRune");
Block.createBlock("selfSacrificeRune", [
	{name: "Self-Sacrifice Rune", texture: [["sacrifice", 0]], inCreative: true}
],BLOCK_TYPE_BLOOD_ALTAR);
IDRegistry.genBlockID("sacrificeRune");
Block.createBlock("sacrificeRune", [
	{name: "Sacrifice Rune", texture: [["sacrifice_rune", 0]], inCreative: true}
],BLOCK_TYPE_BLOOD_ALTAR);
IDRegistry.genBlockID("capacityAltarRune");
Block.createBlock("capacityAltarRune", [
	{name: "Rune Of Augmented Capacity", texture: [["capasity", 0]], inCreative: true}
],BLOCK_TYPE_BLOOD_ALTAR);
IDRegistry.genBlockID("dislocationRune");
Block.createBlock("dislocationRune", [
	{name: "Rune Of Dislocation", texture: [["dislocation", 0]], inCreative: true}
],BLOCK_TYPE_BLOOD_ALTAR);

Translation.addTranslation("Blood Rune", {ru: "Руна Крови"});
Translation.addTranslation("Speed Rune", {ru: "Руна Скорости"});
Translation.addTranslation("Self-Sacrifice Rune", {ru: "Руна Самопожертвования"});
Translation.addTranslation("Sacrifice Rune", {ru: "Руна Жертвы"});
Translation.addTranslation("Rune Of Augmented Capacity", {ru: "Руна Ёмкости Алтаря"});
Translation.addTranslation("Rune Of Dislocation", {ru: "Руна Дислокации"});

Recipes.addShaped({id: IDData.block.bloodRune, count: 1, data: 0}, ["sss", "pup", "sss"], ["s", 1,0,"p", IDData.item.blankSlate, 0, "g", IDData.item.weakBloodOrb, 0], backWorkbench);
Recipes.addShaped({id: IDData.block.speedRune, count: 1, data: 0}, ["sbs", "hrh", "sbs"], ["s", 1,0,"r", IDData.block.bloodRune, 0, "b", IDData.item.blankSlate, 0,"h",353,0]);
Recipes.addShaped({id: IDData.block.selfSacrificeRune, count: 1, data: 0}, ["sbs", "hrh", "sbs"], ["s", 1,0,"r", IDData.item.apprenticeBloodOrb, 0, "b", IDData.item.reinforcedSlate, 0,"h",348,0], backWorkbench);
Recipes.addShaped({id: IDData.block.sacrificeRune, count: 1, data: 0}, ["sbs", "hrh", "sbs"], ["s", 1,0,"r", IDData.item.apprenticeBloodOrb, 0, "b", IDData.item.reinforcedSlate, 0,"h",266,0], backWorkbench);
Recipes.addShaped({id: IDData.block.capacityAltarRune, count: 1, data: 0}, ["gpg", "psp", "gwg"], ["g",1,0,"s", IDData.item.infusedSlate,0, "w",IDData.item.magiciansBloodOrb,0, "p",325,0],backWorkbench);




// file: Block/BloodStone.js

IDRegistry.genBlockID("largeBloodStoneBrick");
Block.createBlock("largeBloodStoneBrick", [
	{name: "Large Blood Stone Brick", texture: [["large_blood_stone_brick",0]], inCreative: true}
],BLOCK_TYPE_BLOOD_ALTAR);
IDRegistry.genBlockID("bloodStoneBrick");
Block.createBlock("bloodStoneBrick", [
	{name: "Blood Stone Brick", texture: [["blood_stone_brick",0]], inCreative: true}
],BLOCK_TYPE_BLOOD_ALTAR);

Translation.addTranslation("Large Blood Stone Brick", {ru: "Большой Кровавый Камень"});
Translation.addTranslation("Blood Stone Brick", {ru: "Кровавый Камень"});

Recipes.addShaped({id: IDData.block.largeBloodStoneBrick, count: 32, data: 0}, ["hgs", "sss", "sss"], ["g",1,0,"h", IDData.item.weakBloodShard,0]);
Recipes.addShaped({id: IDData.block.bloodStoneBrick, count: 4, data: 0}, ["hhs", "hhs", "sss"], ["h", IDData.block.largeBloodStoneBrick,0]);




// file: Mechanism/BloodAltar.js

IDRegistry.genBlockID("bloodAltar");
Block.createBlock("bloodAltar", [
	{name: "Blood Altar", texture: [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0],["blood_altar", 0],["blood_altar", 0],["blood_altar", 0],["blood_altar", 0],["blood_altar", 2],["blood_altar", 0],["blood_altar", 0],["blood_altar", 0],["blood_altar", 0]], inCreative: true},
	{name: "Blood Altar", texture: [["blood_altar", 0],["blood_altar", 2],["blood_altar", 0],["blood_altar", 0],["blood_altar", 0],["blood_altar", 0],["blood_altar", 0],["blood_altar", 2],["blood_altar", 0],["blood_altar", 0],["blood_altar", 0],["blood_altar", 0]], inCreative: false}
],BLOCK_TYPE_BLOOD_ALTAR);

Translation.addTranslation("Blood Altar", {ru: "Алтарь Крови"});

Recipes.addShaped({id: IDData.block.bloodAltar, count: 1, data: 0}, ["pap", "pup", "hgh"], ["h", 266,0,"p", 1, 0, "g", 264, -1, "u", 61, -1]);


var bloodAnimationTexture = new Texture("blood_animation_0.png").setResolution(16,16);
var bloodAnimationModel = new EntityModel(bloodAnimationTexture);
bloodAnimationModel.setTexture(bloodAnimationTexture);
var bloodAnimationRender = new Render();
bloodAnimationModel.createAnimation(1, function(frame) {
    var partObj = [{type: "box", coords: {x: 0, y: 0, z: 0}, size: {x: 10, y: 3, z: 10},uv: {x: 0,y: 0}}
    ];

    bloodAnimationRender.setPart("body", partObj, {});
    return bloodAnimationRender;
}, 0.5);

var altarBlock=[IDData.block.bloodRune,IDData.block.speedRune, IDData.block.selfSacrificeRune,IDData.block.sacrificeRune, IDData.block.capacityAltarRune,IDData.block.dislocationRune];
var getTier={
	
	getBlock:function(x,y,z){
		for(var i in altarBlock){
			if(World.getBlock(x, y, z).id==altarBlock[i]){
				return true;
			}
		}
		return false;
	},
	getUpgrade:function(x,y,z){
		if(this.getBlock(x,y,z)&&World.getBlock(x, y, z).id==IDData.block.speedRune){
			return {speed:.2};
		}else if(this.getBlock(x,y,z)&&World.getBlock(x, y, z).id==IDData.block.selfSacrificeRune){
			return {selfSacrifice:.1};
		}else if(this.getBlock(x,y,z)&&World.getBlock(x, y, z).id==IDData.block.capacityAltarRune){
			return {augmentCapacity: 2000};
		}else if(this.getBlock(x,y,z)&&World.getBlock(x, y, z).id==IDData.block.sacrificeRune){
			return {sacrifice:.1};
		}else if(this.getBlock(x,y,z)&&World.getBlock(x, y, z).id==IDData.block.dislocationRune){
			return {dislocation:1};
		}else{
			return {};
		}
	},
	plusEffect:function(f,x,y,z){
		var s =this.getUpgrade(x,y,z);
		if(!(s.speed===undefined)){
			f.speed+=s.speed;
		}
		/*if("capacity" in s){
			f.capacity+=s.capacity;
		}*/
		if("sacrifice" in s){
			f.sacrifice+=s.sacrifice;
		}
		if(!(s.selfSacrifice===undefined)){
			f.selfSacrifice+=s.selfSacrifice;
		}
		if("dislocation" in s){
			f.dislocation+=s.dislocation;
		}
		if("augmentCapacity" in s){
			f.augmentCapacity+=s.augmentCapacity;
		}
	},
	Level2:function(x,y,z){
		if(this.getBlock(x+1,y,z)&&this.getBlock(x-1,y,z)&&this.getBlock(x,y,z+1)&&this.getBlock(x,y,z-1)&&this.getBlock(x+1,y,z+1)&&this.getBlock(x+1,y,z-1)&&this.getBlock(x-1,y,z-1)&&this.getBlock(x-1,y,z+1)){
			var effect = {speed:0,capacity:0, sacrifice:0, selfSacrifice:0, dislocation:0, augmentCapacity:0};
			this.plusEffect(effect,x+1,y,z);
			this.plusEffect(effect,x-1,y,z);
			this.plusEffect(effect,x,y,z+1);
			this.plusEffect(effect,x,y,z-1);
			return [true,effect];
		}else{
			return false;
		}
	},
	Level3:function(x,y,z){
		if(this.getBlock(x-3,y-1,z+1)&&this.getBlock(x-3,y-1,z+2)&&this.getBlock(x-3,y-1,z-1)&&this.getBlock(x-3,y-1,z-2)&&this.getBlock(x-3,y-1,z)&&this.getBlock(x+3,y-1,z+1)&&this.getBlock(x+3,y-1,z+2)&&this.getBlock(x+3,y-1,z-1)&&this.getBlock(x+3,y-1,z-2)&&this.getBlock(x+3,y-1,z)&&this.getBlock(x,y-1,z-3)&&this.getBlock(x+1,y-1,z-3)&&this.getBlock(x+2,y-1,z-3)&&this.getBlock(x-1,y-1,z-3)&&this.getBlock(x-2,y-1,z-3)&&this.getBlock(x,y-1,z+3)&&this.getBlock(x+1,y-1,z+3)&&this.getBlock(x+2,y-1,z+3)&&this.getBlock(x-1,y-1,z+3)&&this.getBlock(x-2,y-1,z+3)&&World.getBlock(x-3,y,z-3).id!=0&&World.getBlock(x+3,y,z-3).id!=0&&World.getBlock(x-3,y,z+3).id!=0&&World.getBlock(x+3,y,z+3).id!=0&&World.getBlock(x-3,y+1,z-3).id!=0&&World.getBlock(x+3,y+1,z-3).id!=0&&World.getBlock(x-3,y+1,z+3).id!=0&&World.getBlock(x+3,y+1,z+3).id!=0&&World.getBlock(x-3,y+2,z-3).id==89&&World.getBlock(x+3,y+2,z-3).id==89&&World.getBlock(x-3,y+2,z+3).id==89&&World.getBlock(x+3,y+2,z+3).id==89){
			var effect = {speed:0,capacity:0, sacrifice:0, selfSacrifice:0, dislocation:0, augmentCapacity:0};
			this.plusEffect(effect,x+1,y,z-1);
			this.plusEffect(effect,x+1,y,z+1);
			this.plusEffect(effect,x-1,y,z+1);
			this.plusEffect(effect,x-1,y,z-1);
			this.plusEffect(effect,x+3,y-1,z);
			this.plusEffect(effect,x+3,y-1,z+1);
			this.plusEffect(effect,x+3,y-1,z+2);
			this.plusEffect(effect,x+3,y-1,z-1);
			this.plusEffect(effect,x+3,y-1,z-2);
			this.plusEffect(effect,x-3,y-1,z);
			this.plusEffect(effect,x-3,y-1,z+1);
			this.plusEffect(effect,x-3,y-1,z+2);
			this.plusEffect(effect,x-3,y-1,z-1);
			this.plusEffect(effect,x-3,y-1,z-2);
			this.plusEffect(effect,x+1,y-1,z+3);
			this.plusEffect(effect,x,y-1,z+3);
			this.plusEffect(effect,x+2,y-1,z+3);
			this.plusEffect(effect,x-1,y-1,z+3);
			this.plusEffect(effect,x-2,y-1,z+3);
			this.plusEffect(effect,x+1,y-1,z-3);
			this.plusEffect(effect,x,y-1,z-3);
			this.plusEffect(effect,x+2,y-1,z-3);
			this.plusEffect(effect,x-1,y-1,z-3);
			this.plusEffect(effect,x-2,y-1,z-3);
			return [true,effect];
		}else{
			return false;
		}
	},
	getBlockInLine:function(x,y,z,vectorX, vectorY, vectorZ){ 
		for(var xx = 0; xx<=vectorX;xx++){
			for(var yy = 0; yy<=vectorY;yy++){
				for(var zz = 0; zz<=vectorZ;zz++){
					if(!this.getBlock(xx+x, yy+y, zz+z)){
						return false;
					}
				}
			}
		}
		return true;
	},
	plusEffectInLine:function(effect, x,y,z, vX, vY, vZ){
		var Effect = {speed:0,capacity:0, sacrifice:0, selfSacrifice:0, dislocation:0, augmentCapacity:0};
		for(var xx = 0; xx<=vX;xx++){
			for(var yy = 0; yy<=vY;yy++){
				for(var zz = 0; zz<=vZ;zz++){
					this.plusEffect(Effect, xx+x, yy+y, zz+z);
				}
			}
		}
		if(!(Effect.speed===undefined)){
			effect.speed+=Effect.speed;
		}
		if("sacrifice" in Effect){
			effect.sacrifice+=Effect.sacrifice;
		}
		if(!(Effect.selfSacrifice===undefined)){
			effect.selfSacrifice+=Effect.selfSacrifice;
		}
		if("dislocation" in Effect){
			effect.dislocation+=Effect.dislocation;
		}
		if("augmentCapacity" in Effect){
			effect.augmentCapacity+=Effect.augmentCapacity;
		}
	},
	Level4:function(x,y,z){
		if(this.getBlockInLine(x-5, y-2, z-3, 0, 0, 6)&&this.getBlockInLine(x+5, y-2, z-3, 0, 0, 6)&&this.getBlockInLine(x-3, y-2, z-5, 6, 0, 0)&&this.getBlockInLine(x-3, y-2, z+5, 6, 0, 0)&&World.getBlock(x-5, y-1, z-5).id!=0&&World.getBlock(x+5, y-1, z-5).id!=0&&World.getBlock(x-5, y-1, z+5).id!=0&&World.getBlock(x+5, y-1, z+5).id!=0&&
		World.getBlock(x-5, y, z-5).id!=0&&World.getBlock(x+5, y, z-5).id!=0&&World.getBlock(x-5, y, z+5).id!=0&&World.getBlock(x+5, y, z+5).id!=0&&World.getBlock(x-5, y+1, z-5).id!=0&&World.getBlock(x+5, y+1, z-5).id!=0&&World.getBlock(x-5, y+1, z+5).id!=0&&World.getBlock(x+5, y+1, z+5).id!=0&&World.getBlock(x-5, y+2, z-5).id!=0&&World.getBlock(x+5, y+2, z-5).id!=0&&World.getBlock(x-5, y+2, z+5).id!=0&&World.getBlock(x+5, y+2, z+5).id!=0&&
		World.getBlock(x-5, y+3, z-5).id==IDData.block.largeBloodStoneBrick&&World.getBlock(x+5, y+3, z-5).id==IDData.block.largeBloodStoneBrick&&World.getBlock(x-5, y+3, z+5).id==IDData.block.largeBloodStoneBrick&&World.getBlock(x+5, y+3, z+5).id==IDData.block.largeBloodStoneBrick){
			var effect = {speed:0,capacity:0, sacrifice:0, selfSacrifice:0, dislocation:0, augmentCapacity:0};
			this.plusEffectInLine(effect,x-5, y-2, z-3, 0, 0, 6);
			this.plusEffectInLine(effect,x+5, y-2, z-3, 0, 0, 6);
			this.plusEffectInLine(effect,x-3, y-2, z-5, 6, 0, 0);
			this.plusEffectInLine(effect,x-3, y-2, z+5, 6, 0, 0);
			return [true,effect];
		}else{
			return false;
		}
	}
};

TileEntity.registerPrototype(BlockID.bloodAltar, {
	defaultValues: {
	id:0,
	data:0,
	recipe:null,
	speed:1,
	selfSacrifice:1,
	sacrifice:1,
	augmentCapacity:10000,
	dislocation:0,
	blood:0
	},
	animation:null,
	init:function(){
		this.animation = new Animation.Item(this.x+.5, this.y+1.1, this.z+.5);
		if(this.data.id!=0){
			this.animation.describeItem({
			id: this.data.id,
			count: 1,
			data: this.data.data,
			size: .3
		});
		this.animation.load();
		}
		
		this.bloodAnimation = new Animation.Base(this.x+.5, this.y-.6-.01+((this.data.blood/this.getBloodStorage())*2)/16-2/16, this.z+.5);
		this.bloodAnimation.describe({
			render: bloodAnimationRender.getId(),
			skin: "mob/blood_animation_0.png"
		});
		this.bloodAnimation.load();
	},
	tick: function(){
			if(World.getWorldTime()%100==0){
			var Tier2=getTier.Level2(this.x, this.y-1, this.z);
			var Tier3=getTier.Level3(this.x, this.y-1, this.z);
			var Tier4=getTier.Level4(this.x, this.y-1, this.z);
			if(Tier2[0]){
				this.data.tier=2;
				this.data.speed=Tier2[1].speed+1;
				this.data.selfSacrifice=Tier2[1].selfSacrifice+1;
				this.data.sacrifice=Tier2[1].sacrifice+1;
				this.data.augmentCapacity=Tier2[1].augmentCapacity+10000;
				this.data.dislocation=Tier2[1].dislocation;
				if(Tier3[0]){
					this.data.tier=3;
					this.data.speed=Tier3[1].speed+this.data.speed;
					this.data.selfSacrifice=Tier3[1].selfSacrifice+this.data.selfSacrifice;
					this.data.sacrifice=Tier3[1].sacrifice+this.data.sacrifice;
					this.data.augmentCapacity=Tier3[1].augmentCapacity+this.data.augmentCapacity;
					this.data.dislocation=Tier3[1].dislocation+this.data.dislocation;
					if(Tier4[0]){
					this.data.tier=4;
					this.data.speed=Tier4[1].speed+this.data.speed;
					this.data.selfSacrifice=Tier4[1].selfSacrifice+this.data.selfSacrifice;
					this.data.sacrifice=Tier4[1].sacrifice+this.data.sacrifice;
					this.data.augmentCapacity=Tier4[1].augmentCapacity+this.data.augmentCapacity;
					this.data.dislocation=20*Tier4[1].dislocation+this.data.dislocation;
				}
				}
			}else{
				this.data.tier=1;
			}
		}
		
		if(World.getWorldTime()%2==0){
			this.bloodAnimation.setPos(this.x+.5, this.y-.6-.01+((this.data.blood/this.getBloodStorage())*2)/16-2/17, this.z+.5);
		}
		
		if(this.data.progres<=0&&this.data.recipe){
			if(){
			this.data.id=this.data.recipe.resultId;
			this.data.data=this.data.recipe.resultData;
			this.animation.describeItem({
			id: this.data.id,
			count: 1,
			data: this.data.data,
			size: .3
		});
		this.animation.load();
			this.data.recipe.define();	
			this.data.recipe=null;
			addBloodParticle(this.x,this.y+1,this.z, 20);
		}
	}
		if(this.data.progres>0&&this.data.blood>0&&this.data.id==this.data.recipe.id&&this.data.data==this.data.recipe.data&&this.data.tier>=this.data.recipe.tier){
			
			this.data.progres-=1*this.data.speed;
			this.data.blood= Math.max(this.data.blood-(this.data.recipe.blood/this.data.recipe.time)*this.data.speed,0);
			if(this.data.progres%10==0){
				Particles.addFarParticle(10,this.x+.25+Math.random()/2, this.y+Math.random()/3+0.8, this.z+.25+Math.random()/2);
			}
		}
		if(this.data.blood==0&&this.data.progres>0&&this.data.progres<=this.data.recipe.time-10&&this.data.id==this.data.recipe.id&&this.data.data==this.data.recipe.data){
			this.data.progres+=10;
			if(this.data.progres%40){
				Particles.addFarParticle(5,this.x+Math.random(), this.y+Math.random()/3+0.8, this.z+Math.random());
			}
			}
	},
	getBloodStorage: function(){
		return this.data.augmentCapacity;
	},
	addBlood: function(count){
		if (this.data.blood < this.getBloodStorage()){
				this.data.blood = Math.round(Math.min(this.data.blood + count*this.data.selfSacrifice, this.getBloodStorage()));
			}
	},
	addBloodOther: function(count){
		if (this.data.blood < this.getBloodStorage()){
				this.data.blood = Math.round(Math.min(this.data.blood + count*this.data.sacrifice, this.getBloodStorage()));
			}
	},
	
	click: function(){
		Game.prevent();
		//TODO проверка приседания
		if(this.data.id!=0&&Player.getCarriedItem().id!=IDData.item.sacrificialKnife){
			World.drop(this.x+.5, this.y+1.2, this.z+.5, this.data.id, 1, this.data.data);
			this.data.id=0;
			this.data.data=0;
			this.animation.destroy();
		}else{
		for(var i in altarBloodRecipe){
			if(Player.getCarriedItem().id==altarBloodRecipe[i].id&&Player.getCarriedItem().data==altarBloodRecipe[i].data&&this.data.id==0){
				this.data.id=Player.getCarriedItem().id;
				this.data.data=Player.getCarriedItem().data;
				this.data.progres=altarBloodRecipe[i].time;
				this.data.recipe=altarBloodRecipe[i];
				Player.decreaseCarriedItem(1);
			this.animation.describeItem({
			id: this.data.id,
			count: 1,
			data: this.data.data,
			size: .3
		});
		this.animation.load();
				}
				}
			}	
	},
	destroy:function(){
		World.drop(this.x+.5, this.y+0.5, this.z+.5, this.data.id, 1, this.data.data);
		this.animation.destroy();
		addBloodParticle(this.x, this.y, this.z,10);
		this.bloodAnimation.destroy();
	}
});

var render = new ICRender.Model();
var render2 = new ICRender.Model();
BlockRenderer.setStaticICRender (BlockID.bloodAltar, 0, render);
BlockRenderer.setStaticICRender (BlockID.bloodAltar, 1, render2);
var model = BlockRenderer.createModel();

model.addBox (-1/8, 0, -1/8, 1/8, 1+1/16, 1/8,  [["blood_altar", 3],["blood_altar", 3],["blood_altar", 0]]);
model.addBox (-1/8, 0, 7/8, 1/8, 1+1/16, 9/8,  [["blood_altar", 3],["blood_altar", 3],["blood_altar",0]]);
model.addBox (7/8, 0, -1/8, 9/8, 1+1/16, 1/8,  [["blood_altar", 3],["blood_altar", 3],["blood_altar",0]]);
model.addBox (7/8, 0, 7/8, 9/8, 1+1/16, 9/8,  [["blood_altar", 3],["blood_altar", 3],["blood_altar", 0]]);

model.addBox (0, 0, 0, 1, 14/16, 1,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);

model.addBox (0, 14/16, 0, 5/16, 15/16, 1,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (11/16, 14/16, 0, 1, 15/16, 1,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (5/16, 14/16, 0, 11/16, 15/16, 5/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (5/16, 14/16, 11/16, 11/16, 15/16, 1,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);

model.addBox (5/16, 14/16, 5/16, 6/16, 15/16, 6/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (10/16, 14/16, 10/16, 11/16, 15/16, 11/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (10/16, 14/16, 5/16, 11/16, 15/16, 6/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (5/16, 14/16, 10/16, 6/16, 15/16, 11/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);



model.addBox (0, 15/16, 0, 3/16, 1, 1,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (13/16, 15/16, 0, 1, 1, 1,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (3/16, 15/16, 0, 13/16, 1, 3/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (3/16, 15/16, 13/16, 13/16, 1, 1,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);

model.addBox (3/16, 15/16, 3/16, 5/16, 1, 4/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (11/16, 15/16, 12/16, 13/16, 1, 13/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (3/16, 15/16, 12/16, 5/16, 1, 13/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (11/16, 15/16, 3/16, 13/16, 1, 4/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);

model.addBox (3/16, 15/16, 4/16, 4/16, 1, 5/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (12/16, 15/16, 4/16, 13/16, 1, 5/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (3/16, 15/16, 11/16, 4/16, 1, 12/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (12/16, 15/16, 11/16, 13/16, 1, 12/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);

render.addEntry(model);




// file: UsefulItems/Sigil/sigil1Tier.js

IDRegistry.genItemID("waterSigil");
Item.createItem("waterSigil", "Water Sigil", {name: "water_sigil", meta: 0}, {stack: 1});
IDRegistry.genItemID("lavaSigil");
Item.createItem("lavaSigil", "Lava Sigil", {name: "lava_sigil", meta: 0}, {stack: 1});

Translation.addTranslation("Lava Crystal", {ru: "Лавовый Кристал"});
Translation.addTranslation("Lava Sigil", {ru: "Сигил Лавы"});
Translation.addTranslation("Water Sigil", {ru: "Сигил Воды"});

Item.registerUseFunction("lavaSigil", function(coords, item, block){
	if(World.getBlock(coords.relative.x, coords.relative.y, coords.relative.z).id==0&&bloodNetwork.getBlood(1000)){
	World.setBlock(coords.relative.x, coords.relative.y, coords.relative.z, 10, 0);
	}
});
Item.registerUseFunction("waterSigil", function(coords, item, block){
	if(World.getBlock(coords.relative.x, coords.relative.y, coords.relative.z).id==0&&bloodNetwork.getBlood(100)){
	World.setBlock(coords.relative.x, coords.relative.y, coords.relative.z, 8, 0);
	}
});

Recipes.addShaped({id: IDData.item.waterSigil, count: 1, data: 0}, ["ggg", "gsg", "gwg"], ["g",325,8,"s", IDData.item.blankSlate,0, "w",IDData.item.weakBloodOrb,0],backWorkbench);
Recipes.addShaped({id: IDData.item.lavaSigil, count: 1, data: 0}, ["gpg", "gsg", "gwg"], ["g",325,10,"s", IDData.item.blankSlate,0, "w",IDData.item.lavaCrystal,0, "p",378,0],backWorkbench);




// file: UsefulItems/Sigil/sigil2Tier.js

IDRegistry.genItemID("voidSigil");
Item.createItem("voidSigil", "Void Sigil", {name: "void_sigil", meta: 0}, {stack: 1});
IDRegistry.genItemID("airSigil");
Item.createItem("airSigil", "Air Sigil", {name: "air_sigil", meta: 0}, {stack: 1});
//TODO Сделать сигил растениевый
IDRegistry.genItemID("fastMiningSigilDeactive");
Item.createItem("fastMiningSigilDeactive", "Fast Mining Sigil", {name: "mining_sigil", meta: 0}, {stack: 1});
IDRegistry.genItemID("fastMiningSigilActive");
Item.createItem("fastMiningSigilActive", "Fast Mining Sigil", {name: "mining_sigil", meta: 1}, {stack: 1, isTech:true});

Translation.addTranslation("Void Sigil", {ru: "Сигил Пустоты"});
Translation.addTranslation("Air Sigil", {ru: "Сигил Полёта"});
Translation.addTranslation("Fast Mining Sigil", {ru: "Сигил Быстрого Шахтёра"});

Callback.addCallback("ItemUse",function(coords, item, block){
	sigilDeactivation(IDData.item.fastMiningSigilActive, IDData.item.fastMiningSigilDeactive, item.id);
	});
	Callback.addCallback("tick",function(){
sigilActivation(IDData.item.fastMiningSigilActive, function(){
		if(World.getWorldTime()%2==0&&bloodNetwork.getBlood(1)){
			Entity.addEffect(Player.get(), Native.PotionEffect.digSpeed, 2, 30, true, true);
		}
		
	});
	});
	Item.registerNoTargetUseFunction("airSigil", function(item){
 if(bloodNetwork.getAmountBlood(100)){
	 Player.setVelocity(Entity.getLookVector(Player.get()).x,Entity.getLookVector(Player.get()).y+1.5,Entity.getLookVector(Player.get()).z);
	 
 }
 });
	Recipes.addShaped({id: IDData.item.airSigil, count: 1, data: 0}, ["gpg", "gsg", "gwg"], ["g",288,0,"s", IDData.item.reinforcedSlate,0, "w",IDData.item.apprenticeBloodOrb,0, "p",370,0],backWorkbench);
	Recipes.addShaped({id: IDData.item.voidSigil, count: 1, data: 0}, ["gpg", "gsg", "gwg"], ["g",325,0,"s", IDData.item.reinforcedSlate,0, "w",IDData.item.apprenticeBloodOrb,0, "p",287,0],backWorkbench);
Recipes.addShaped({id: IDData.item.fastMiningSigilDeactive, count: 1, data: 0}, ["ghg", "osa", "gwg"], ["g",1,0,"s", IDData.item.reinforcedSlate,0, "w",IDData.item.apprenticeBloodOrb,0, "o",256,0, "h", 257,0, "a", 258,0],backWorkbench);
Item.setLiquidClip(IDData.item.voidSigil,true);
Item.registerUseFunction("voidSigil", function(coords, item, block){
				if(World.getBlock(coords.x, coords.y, coords.z).id==9||World.getBlock(coords.x, coords.y, coords.z).id==11){
					if(bloodNetwork.getBlood(50)){
						World.setBlock(coords.x, coords.y, coords.z, 0);
					}
	
	}
});





// file: Block/techBlock.js

IDRegistry.genBlockID("bloodLamp");
Block.createBlock("bloodLamp", [
	{name: "Blood Lamp (Is Tech)", texture: [["empty",0]], inCreative: false}
],BLOCK_TYPE_BLOOD_LAMP);
IDRegistry.genBlockID("phantomBlock");
Block.createBlock("phantomBlock", [
	{name: "Phantom Block", texture: [["blood_rune",0]], inCreative: false}
],BLOCK_TYPE_PHANTOM_BLOCK);

Block.registerDropFunction("bloodLamp", function(coords, id, data, diggingLevel, toolLevel){
	return [[0, 0, 0]]; 
});
Block.setBlockShape(BlockID.bloodLamp, {x: 0.3, y: 0.3, z: 0.3}, {x: 0.7, y: 0.7, z: 0.7});
Block.registerDropFunction("phantomBlock", function(coords, id, data, diggingLevel, toolLevel){
	return [[0, 0, 0]]; 
});
Block.registerDropFunction("bloodLamp", function(coords, id, data, diggingLevel, toolLevel){
	return [[0, 0, 0]]; 
});
Callback.addCallback("tick",function(){
	for(var i in phantomArray){
		if(phantomArray[i].time>0){
			phantomArray[i].time--;
		}
		if(phantomArray[i].time==0){
			World.setBlock(phantomArray[i].x,phantomArray[i].y,phantomArray[i].z,0);
			delete phantomArray[i];
		}
	}
	});
	
	Callback.addCallback("ItemUse",function(coords, item, block){
		if(item.id<256&&block.id==BlockID.phantomBlock){
			Game.prevent();
			World.setBlock(coords.x, coords.y, coords.z, item.id, item.data);
			for(var i in phantomArray){
				if(phantomArray[i].x==coords.x&&phantomArray[i].y==coords.y&&phantomArray[i].z==coords.z){
					delete phantomArray[i];
				}
			}
		}
		});




// file: UsefulItems/Sigil/sigil3Tier.js

IDRegistry.genItemID("elementalAffinitySigilDeactive");
Item.createItem("elementalAffinitySigilDeactive", "Elemental Affinity Sigil", {name: "elemental_sigil", meta: 0}, {stack: 1});
IDRegistry.genItemID("elementalAffinitySigilActive");
Item.createItem("elementalAffinitySigilActive", "Elemental Affinity Sigil", {name: "elemental_sigil", meta: 1}, {stack: 1, isTech:true});
IDRegistry.genItemID("sigilOfHolding");
Item.createItem("sigilOfHolding", "Sigil Of Holding", {name: "sigil_of_holding", meta: 0}, {stack: 1});
IDRegistry.genItemID("sigilOfMagnetismDeactive");
Item.createItem("sigilOfMagnetismDeactive", "Sigil Of Magnetism", {name: "sigil_of_magnetism", meta: 0}, {stack: 1});
IDRegistry.genItemID("sigilOfMagnetismActive");
Item.createItem("sigilOfMagnetismActive", "Sigil Of Megnetism", {name: "sigil_of_magnetism", meta: 1}, {stack: 1, isTech:true});
IDRegistry.genItemID("torchSigil");
Item.createItem("torchSigil", "Sigil Of The Blood Lamp", {name: "torch_sigil", meta: 0}, {stack: 1});
IDRegistry.genItemID("sigilOfPhantomBridgeDeactive");
Item.createItem("sigilOfPhantomBridgeDeactive", "Sigil Of Phantom Bridge", {name: "bridge_sigil", meta: 0}, {stack: 1});
IDRegistry.genItemID("sigilOfPhantomBridgeActive");
Item.createItem("sigilOfPhantomBridgeActive", "Sigil Of Phantom Bridge", {name: "bridge_sigil", meta: 1}, {stack: 1, isTech:true});
//TODO сделать сигил удержания рабочим
Translation.addTranslation("Elemental Affinity Sigil", {ru: "Сигил Элементарной Защиты"});
Translation.addTranslation("Sigil Of Holding", {ru: "Сигил Удержания"});
Translation.addTranslation("Sigil Of Magnetism", {ru: "Сигил Магнетизма"});
Translation.addTranslation("Sigil Of The Blood Lamp", {ru: "Сигил Кровавого Света"});
Translation.addTranslation("Sigil Of Phantom Bridge", {ru: "Сигил Призрачного Моста"});

Recipes.addShaped({id: IDData.item.elementalAffinitySigilDeactive, count: 1, data: 0}, ["ghg", "osa", "gwg"], ["g",49,0,"s", IDData.item.infusedSlate,0, "w",IDData.item.magiciansBloodOrb,0, "o",IDData.item.waterSigil,0, "h", IDData.item.lavaSigil,0, "a", IDData.item.lavaSigil,0],backWorkbench);
Recipes.addShaped({id: IDData.item.sigilOfHolding, count: 1, data: 0}, ["ghg", "hsh", "gwg"], ["g",IDData.item.blankSlate,0,"s", IDData.item.infusedSlate,0, "w",IDData.item.magiciansBloodOrb,0, "h", 1,0],backWorkbench);
Recipes.addShaped({id: IDData.item.sigilOfMagnetismDeactive, count: 1, data: 0}, ["ghg", "hsh", "gwg"], ["g",42,0,"s", IDData.item.infusedSlate,0, "w",IDData.item.magiciansBloodOrb,0, "h", 266,0],backWorkbench);
Recipes.addShaped({id: IDData.item.torchSigil, count: 1, data: 0}, ["gsg", "hhh", "gwg"], ["g",89,0,"h", IDData.item.infusedSlate,0, "w",IDData.item.magiciansBloodOrb,0, "s", 88,0],backWorkbench);
Recipes.addShaped({id: IDData.item.sigilOfPhantomBridgeDeactive, count: 1, data: 0}, ["ggg", "gsg", "hwh"], ["g",1,0,"s", IDData.item.infusedSlate,0, "w",IDData.item.magiciansBloodOrb,0, "h", 88,0],backWorkbench);

Callback.addCallback("ItemUse",function(coords, item, block){
	sigilDeactivation(IDData.item.elementalAffinitySigilActive, IDData.item.elementalAffinitySigilDeactive, item.id);
	sigilDeactivation(IDData.item.sigilOfMagnetismDeactive, IDData.item.sigilOfMagnetismActive, item.id);
	sigilDeactivation(IDData.item.sigilOfPhantomBridgeDeactive, IDData.item.sigilOfPhantomBridgeActive, item.id);
	});
	
	
	
Callback.addCallback("tick",function(){
	sigilActivation(IDData.item.elementalAffinitySigilActive, function(){
		if(bloodNetwork.getBlood(1)){
		Entity.addEffect(Player.get(), Native.PotionEffect.fireResistance, 1, 20, true, true);
		Entity.addEffect(Player.get(), Native.PotionEffect.waterBreathing, 1, 20, true, true);
		if(Player.getVelocity().y<-0.5){
			Entity.addEffect(Player.get(), Native.PotionEffect.jump, 1000, 3, true, true);
		}
		}
	});
	sigilActivation(IDData.item.sigilOfMagnetismActive, function(){
		if(World.getWorldTime()%4==0&&bloodNetwork.getBlood(1)){
			pull(64,5,-1, Player.getPosition().x, Player.getPosition().y-1.5, Player.getPosition().z);
		}
	});
	
	sigilActivation(IDData.item.sigilOfPhantomBridgeActive, function(){
		if(World.getWorldTime()%2==0&&bloodNetwork.getBlood(1)&&World.getWorldTime()%6==0){
			var y = Math.floor(Player.getPosition().y)-2;
			var xx = Math.floor(Player.getPosition().x);
			var zz = Math.floor(Player.getPosition().z);
			if(getSneaking(Player.get())==true){
				for(var x = -2; x<3;x++){
					for(var z = -2; z<3; z++){
						if(World.getBlock(xx+x,y,z+zz).id==0&&bloodNetwork.getBlood(1)){
							World.setBlock(xx+x,y,z+zz,BlockID.phantomBlock,0);
							phantomArray.push({x:x+xx, y:y, z:zz+z, time:100});
						}
					}
				}
				}
			if(getSneaking(Player.get())==false){
				for(var x = -2; x<3;x++){
					for(var z = -2; z<3; z++){
						if(World.getBlock(x+xx,y-1,z+zz).id==0&&bloodNetwork.getBlood(1)){
							World.setBlock(x+xx,y-1,z+zz,BlockID.phantomBlock,0);
							phantomArray.push({x:x+xx, y:y-1, z:zz+z, time:100});
						}
					}
				}
			}
		}
	});
});

Item.registerUseFunction("torchSigil", function(coords, item, block){
		if(bloodNetwork.getBlood(10)){
		World.setBlock(coords.relative.x, coords.relative.y, coords.relative.z, BlockID.bloodLamp, 0);
		World.addTileEntity(coords.relative.x, coords.relative.y, coords.relative.z);
		}
});

TileEntity.registerPrototype(BlockID.bloodLamp, {
	tick: function(){
		if(World.getWorldTime()%20==0){
			Particles.addFarParticle(10,this.x+Math.random()/3+0.33, this.y+Math.random()/3+0.33+0.3, this.z+Math.random()/3+0.33);
		}
	},
});



var UnificationSigil={
	UnificationArray:[[true]],
	getUnificationExist:function(index){
		return this.UnificationArray[index][0];
	},
	setUnification:function(index){
		this.UnificationArray[index]=[
			true,
			0,
			0,
			0,
			0
		];
	},
	GenerateUnification:function(){
		var i = this.UnificationArray.length;
				this.setUnification(i);
				Player.setCarriedItem(Player.getCarriedItem().id, Player.getCarriedItem().count,i);

	},
	getInventory:function(data){
		return this.UnificationArray[data];
	}
};
Saver.addSavesScope("UnificationSigil",
	function read(scope){
		if(scope&&scope.UnificationArray)UnificationSigil.UnificationArray = scope.UnificationArray;
	},
	
	function save(){
		return {UnificationArray:UnificationSigil.UnificationArray};
	}
);
var guiOpened=false;
var container = new UI.Container();
var sigilGUI = new UI.StandartWindow({ 
standart: { 
header: { 
text: { 
text: "Sigil Of Holding" 
} 
}, 
inventory: { 
standart: true 
}, 
background: { 
standart: true 
} 
}, 
drawing: [], 
elements:{
	"first":{type: "slot", x: 500, y: 100, size: 100 },
	"second":{type: "slot", x: 650, y: 100, size: 100},
	"third":{type: "slot", x: 500, y: 250, size: 100},
	"fours":{type: "slot", x: 650, y: 250, size: 100}
} 
});
Item.setMaxDamage(IDData.item.sigilOfHolding,1000);
Item.registerUseFunction("sigilOfHolding", function(coords, item, block){
	if(Player.getCarriedItem().data>0&&UnificationSigil.getUnificationExist(Player.getCarriedItem().data)){
				container.openAs(sigilGUI);	
				container.setSlot("first", UnificationSigil.UnificationArray[item.data][1], 1, 0);
				container.setSlot("second", UnificationSigil.UnificationArray[item.data][2], 1, 0);
				container.setSlot("third", UnificationSigil.UnificationArray[item.data][3], 1, 0);
				container.setSlot("fours", UnificationSigil.UnificationArray[item.data][4], 1, 0);
			}
	if(Player.getCarriedItem().data==0){
			UnificationSigil.GenerateUnification();
			container.openAs(sigilGUI);	
			container.setSlot("first", 0, 0, 0);
				container.setSlot("second", 0, 0, 0);
				container.setSlot("third",0, 0, 0);
				container.setSlot("fours", 0, 0, 0);
			}
});

Callback.addCallback("tick",function(){
	if(container.isOpened()&&World.getWorldTime()%5==0){
		UnificationSigil.UnificationArray[Player.getCarriedItem().data][1]=container.getSlot("first").id;
		UnificationSigil.UnificationArray[Player.getCarriedItem().data][2]=container.getSlot("second").id;
		UnificationSigil.UnificationArray[Player.getCarriedItem().data][3]=container.getSlot("third").id;
		UnificationSigil.UnificationArray[Player.getCarriedItem().data][4]=container.getSlot("fours").id;
	}
});




// file: UsefulItems/Sigil/sigil4Tier.js

IDRegistry.genItemID("hasteSigilDeactive");
Item.createItem("hasteSigilDeactive", "Sigil Of Haste", {name: "haste_sigil", meta: 0}, {stack: 1});
IDRegistry.genItemID("hasteSigilActive");
Item.createItem("hasteSigilActive", "Sigil Of Haste", {name: "haste_sigil", meta: 1}, {stack: 1, isTech:true});
IDRegistry.genItemID("sigilOfTheWhirlwindDeactive");
Item.createItem("sigilOfTheWhirlwindDeactive", "Sigil Of The Whirlwind", {name: "windsigil", meta: 0}, {stack: 1});
IDRegistry.genItemID("sigilOfTheWhirlwindActive");
Item.createItem("sigilOfTheWhirlwindActive", "Sigil Of The Whirlwind", {name: "windsigil", meta: 1}, {stack: 1,isTech:true});
IDRegistry.genItemID("ritualDivinerDusk");
IDRegistry.genItemID("sigilOfSuppressionDeactive");
//Item.createItem("sigilOfSuppressionDeactive", "Sigil Of Suppression", {name: "sigil_of_suppression", meta: 0}, {stack: 1});
IDRegistry.genItemID("sigilOfSuppressionActive");
//Item.createItem("sigilOfSuppressionActive", "Sigil Of Supression", {name: "sigil_of_suppression", meta: 1}, {stack: 1, isTech:true});

Translation.addTranslation("Sigil Of Haste", {ru: "Сигил Спешки"});
Translation.addTranslation("Sigil Of The Whirlwind", {ru: "Сигил Вихря"});
Translation.addTranslation("Sigil Of Suppression", {ru: "Сигил Подавления"});
Recipes.addShaped({id: IDData.item.hasteSigilDeactive, count: 1, data: 0}, ["php", "hsh", "gwg"], ["g",49,0,"s", IDData.item.demonicSlate,0, "w",IDData.item.masterBloodOrb,0, "h", 353,0, "p", 357,0],backWorkbench);
Recipes.addShaped({id: IDData.item.sigilOfTheWhirlwindDeactive, count: 1, data: 0}, ["php", "gsg", "pwp"], ["g",370,0,"s", IDData.item.demonicSlate,0, "w",IDData.item.masterBloodOrb,0, "h", IDData.item.airSigil,0, "p", 288,0],backWorkbench);
Callback.addCallback("ItemUse",function(coords, item, block){
	sigilDeactivation(IDData.item.hasteSigilDeactive, IDData.item.hasteSigilActive, item.id);
	sigilDeactivation(IDData.item.sigilOfTheWhirlwindActive, IDData.item.sigilOfTheWhirlwindDeactive, item.id);
	sigilDeactivation(IDData.item.sigilOfSuppressionDeactive, IDData.item.sigilOfSuppressionActive, item.id);
	
	});
	Callback.addCallback("tick",function(){
	sigilActivation(IDData.item.sigilOfTheWhirlwindActive, function(){
		if(pull(80, 5, 3,Player.getPosition().x,Player.getPosition().y,Player.getPosition().z)||pull(81, 5, 3,Player.getPosition().x,Player.getPosition().y,Player.getPosition().z)||pull(82, 5, 3,Player.getPosition().x,Player.getPosition().y,Player.getPosition().z)||pull(85, 5, 3,Player.getPosition().x,Player.getPosition().y,Player.getPosition().z)){
			bloodNetwork.getBlood(200);
		}
	});
/*sigilActivation(IDData.item.sigilOfSuppressionActive, function(){
			for(var x = -5; x<6; x++){
				for(var y = -5; y<6; y++){
					for(var z = -5 ; z<6; z++){
						if(x*x+y*y+z*z<=25){
							var xx = x+Player.getPosition().x;
							var yy = y+Player.getPosition().y;
							var zz = z+Player.getPosition().z;
							var getBlock=World.getBlock(xx,yy,zz).id;
							if(getBlock==8||getBlock==9){
								if(bloodNetwork.getBlood(10)){
									replaceLiquid.push({id:getBlock, x:xx, y:yy, z:zz});
								World.setBlock(xx,yy,zz,0);
								}				
							}
						}
					}
				}
			}
		});*/
		sigilActivation(IDData.item.hasteSigilActive, function(){
		if(World.getWorldTime()%5==0&&bloodNetwork.getBlood(1)){
			Entity.addEffect(Player.get(), Native.PotionEffect.movementSpeed, 2, 21, true, true);
		Entity.addEffect(Player.get(), Native.PotionEffect.jump, 1, 21, true, true);
		}
	});
	});





// file: RitualCore.js

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




// file: Rituals/Block.js

IDRegistry.genBlockID("imperfectRitualStone");
Block.createBlock("imperfectRitualStone", [
	{name: "Imperfect Ritual Stone", texture: [["imperfect_ritual_stone",0]], inCreative: true}
],BLOCK_TYPE_BLOOD_ALTAR);
IDRegistry.genBlockID("ritualStone");
Block.createBlock("ritualStone", [
	{name: "Ritual Stone", texture: [["ritual_stone",0]], inCreative: true}
],BLOCK_TYPE_BLOOD_ALTAR);
IDRegistry.genBlockID("masterRitualStone");
Block.createBlock("masterRitualStone", [
	{name: "Master Ritual Stone", texture: [["master_ritual_stone",0]], inCreative: true}
],BLOCK_TYPE_BLOOD_ALTAR);
IDRegistry.genBlockID("AirRitualStone");
Block.createBlock("AirRitualStone", [
	{name: "Air Ritual Stone", texture: [["air_ritual_stone",0]], inCreative: true}
],BLOCK_TYPE_BLOOD_ALTAR);
IDRegistry.genBlockID("WaterRitualStone");
Block.createBlock("WaterRitualStone", [
	{name: "Water Ritual Stone", texture: [["water_ritual_stone",0]], inCreative: true}
],BLOCK_TYPE_BLOOD_ALTAR);
IDRegistry.genBlockID("EarthRitualStone");
Block.createBlock("EarthRitualStone", [
	{name: "Earth Ritual Stone", texture: [["earth_ritual_stone",0]], inCreative: true}
],BLOCK_TYPE_BLOOD_ALTAR);
IDRegistry.genBlockID("FireRitualStone");
Block.createBlock("FireRitualStone", [
	{name: "Fire Ritual Stone", texture: [["fire_ritual_stone",0]], inCreative: true}
],BLOCK_TYPE_BLOOD_ALTAR);
IDRegistry.genBlockID("DuskRitualStone");
Block.createBlock("DuskRitualStone", [
	{name: "Dusk Ritual Stone", texture: [["dusk_ritual_stone",0]], inCreative: true}
],BLOCK_TYPE_BLOOD_ALTAR);
IDRegistry.genBlockID("DownRitualStone");
Block.createBlock("DownRitualStone", [
	{name: "Down Ritual Stone", texture: [["light_ritual_stone",0]], inCreative: true}
],BLOCK_TYPE_BLOOD_ALTAR);

Translation.addTranslation("Imperfect Ritual Stone", {ru: "Несовершенный Ритуальный Камень"});
Translation.addTranslation("Ritual Stone", {ru: "Ритуальный Камень"});
Translation.addTranslation("Master Ritual Stone", {ru: "Ритуальный Камень Мастера"});

TileEntity.registerPrototype(BlockID.masterRitualStone, {
	defaultValues:{
		activate:true,
		select:null
	},
	tick: function(){
		if(World.getWorldTime()%20==0&&this.data.select!==null&&this.data.activate){
			this.data.select=Ritual.checkRitual(this.x, this.y, this.z);
		}
		if(this.data.select!=null&&this.data.activate){
			this.data.select.define(this.x,this.y,this.z);
		}
	},
	redstone:function(params){
		if(params.power){
			this.data.activate=false;
		}else{
			this.data.activate=true;
		}
	},
	init: function(){
			if(this.data.select){
		this.data.select = Ritual.ritualByName(this.data.select.name);
		}
	},
	click: function(){
		if(Player.getCarriedItem().id==IDData.item.ritualDiviner){
			
		}	
		if(Player.getCarriedItem().id==IDData.item.weakActivationCrystal){
			var check = Ritual.checkRitual(this.x, this.y, this.z);
			if(check){
				Game.message(check.name);
				if(check.time){
				this.data.select=check;
				bloodNetwork.getBlood(check.LP);
				for( var d =0; d<20; d++){
				Particles.addParticle(this.x+Math.random(), this.y+Math.random()/2+1, this.z+Math.random(), 9, 0, 0, 0,1);
			}
			}if(check.time==false){
				check.define(this.x, this.y, this.z);
			}
			}
		}	
	}
});





// file: Rituals/Item.js

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
Callback.addCallback("ItemUse",function(coords, item, block){
	sigilDeactivation(IDData.item.boundAxeDeactive, IDData.item.boundAxeActive, item.id);
	sigilDeactivation(IDData.item.boundShovelDeactive, IDData.item.boundShovelActive, item.id);
	sigilDeactivation(IDData.item.boundPickaxeDeactive, IDData.item.boundPickaxeActive, item.id);
	sigilDeactivation(IDData.item.boundSwordDeactive, IDData.item.boundSwordActive, item.id);
	});
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


importLib("Tool", "*");
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
		Player.setCarriedItem(Player.getCarriedItem().id, 1, 0);
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
Callback.addCallback("tick",function(){
sigilActivation(ItemID.boundSwordActive, function(){
	if(World.getWorldTime()%20==0&&bloodNetwork.getBlood(1)){
		
	}
});
});
Item.registerUseFunction("boundAxeActive", function(coords, item, block){
	if(getSneaking(Player.get())&&bloodNetwork.getBlood(10000)){
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
});
Item.registerUseFunction("boundShovelActive", function(coords, item, block){
	if(getSneaking(Player.get())&&bloodNetwork.getBlood(10000)){
	ShovelDig(coords);
	}
});
Item.registerUseFunction("boundPickaxeActive", function(coords, item, block){
	if(getSneaking(Player.get())&&bloodNetwork.getBlood(10000)){
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




