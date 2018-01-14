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
