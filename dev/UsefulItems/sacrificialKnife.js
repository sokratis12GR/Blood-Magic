IDRegistry.genItemID("sacrificialKnife");
Item.createItem("sacrificialKnife", "Sacrificial Knife", {name: "dagger", meta: 0}, {stack: 1});

Translation.addTranslation("Sacrificial Knife", {ru: "Жертвенный Нож"});

Recipes.addShaped({id: IDData.item.sacrificialKnife, count: 1, data: 0}, ["ggg", "aog", "iag"], ["g",20,0,"o", 266,0, "i",265,0]);

Item.registerUseFunction("sacrificialKnife", function(coords, item, block){
		
	if(block.id==IDData.block.bloodAltar){
		addBloodParticle(coords.x,coords.y+0.6,coords.z,12);
		World.getTileEntity(coords.x, coords.y, coords.z).addBlood(200);
		if(getGameMode()==0){
			Entity.setHealth(Player.get(),Entity.getHealth(Player.get())-2);
			}
	}
});
