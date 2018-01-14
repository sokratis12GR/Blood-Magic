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
