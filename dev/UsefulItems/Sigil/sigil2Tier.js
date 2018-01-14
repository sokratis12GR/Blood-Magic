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

