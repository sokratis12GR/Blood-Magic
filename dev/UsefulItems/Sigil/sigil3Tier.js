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
			Particles.addFarParticle(10,this.x+Math.random()/3+0.33, this.y+Math.random()/3+0.33+0.3, this.z+Math.random()/3+0.33,0,0,0,0);
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
