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
