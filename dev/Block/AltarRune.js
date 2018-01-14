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
