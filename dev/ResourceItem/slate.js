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
