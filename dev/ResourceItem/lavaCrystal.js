IDRegistry.genItemID("lavaCrystal");
Item.createItem("lavaCrystal", "Lava Crystal", {name: "lava_crystal", meta: 0}, {stack: 1});

Translation.addTranslation("Lava Crystal", {ru: "Лавовый Кристал"});

Recipes.addShaped({id: IDData.item.lavaCrystal, count: 1, data: 0}, ["glg", "lwl", "oao"], ["g",20,0,"l", 325,10, "w",IDData.item.weakBloodOrb,0, "o",49,0,"a",264,0],backWorkbench);
