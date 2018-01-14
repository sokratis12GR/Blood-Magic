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
Translation.addTranslation("Magician's Blood Orb", {ru: "Чародейский Кровавый Шар"});
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
