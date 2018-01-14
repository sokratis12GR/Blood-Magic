IDRegistry.genItemID("hasteSigilDeactive");
Item.createItem("hasteSigilDeactive", "Sigil Of Haste", {name: "haste_sigil", meta: 0}, {stack: 1});
IDRegistry.genItemID("hasteSigilActive");
Item.createItem("hasteSigilActive", "Sigil Of Haste", {name: "haste_sigil", meta: 1}, {stack: 1, isTech:true});
IDRegistry.genItemID("sigilOfTheWhirlwindDeactive");
Item.createItem("sigilOfTheWhirlwindDeactive", "Sigil Of The Whirlwind", {name: "windsigil", meta: 0}, {stack: 1});
IDRegistry.genItemID("sigilOfTheWhirlwindActive");
Item.createItem("sigilOfTheWhirlwindActive", "Sigil Of The Whirlwind", {name: "windsigil", meta: 1}, {stack: 1,isTech:true});
IDRegistry.genItemID("ritualDivinerDusk");
IDRegistry.genItemID("sigilOfSuppressionDeactive");
//Item.createItem("sigilOfSuppressionDeactive", "Sigil Of Suppression", {name: "sigil_of_suppression", meta: 0}, {stack: 1});
IDRegistry.genItemID("sigilOfSuppressionActive");
//Item.createItem("sigilOfSuppressionActive", "Sigil Of Supression", {name: "sigil_of_suppression", meta: 1}, {stack: 1, isTech:true});

Translation.addTranslation("Sigil Of Haste", {ru: "Сигил Спешки"});
Translation.addTranslation("Sigil Of The Whirlwind", {ru: "Сигил Вихря"});
Translation.addTranslation("Sigil Of Suppression", {ru: "Сигил Подавления"});
Recipes.addShaped({id: IDData.item.hasteSigilDeactive, count: 1, data: 0}, ["php", "hsh", "gwg"], ["g",49,0,"s", IDData.item.demonicSlate,0, "w",IDData.item.masterBloodOrb,0, "h", 353,0, "p", 357,0],backWorkbench);
Recipes.addShaped({id: IDData.item.sigilOfTheWhirlwindDeactive, count: 1, data: 0}, ["php", "gsg", "pwp"], ["g",370,0,"s", IDData.item.demonicSlate,0, "w",IDData.item.masterBloodOrb,0, "h", IDData.item.airSigil,0, "p", 288,0],backWorkbench);
Callback.addCallback("ItemUse",function(coords, item, block){
	sigilDeactivation(IDData.item.hasteSigilDeactive, IDData.item.hasteSigilActive, item.id);
	sigilDeactivation(IDData.item.sigilOfTheWhirlwindActive, IDData.item.sigilOfTheWhirlwindDeactive, item.id);
	sigilDeactivation(IDData.item.sigilOfSuppressionDeactive, IDData.item.sigilOfSuppressionActive, item.id);
	
	});
	Callback.addCallback("tick",function(){
	sigilActivation(IDData.item.sigilOfTheWhirlwindActive, function(){
		if(pull(80, 5, 3,Player.getPosition().x,Player.getPosition().y,Player.getPosition().z)||pull(81, 5, 3,Player.getPosition().x,Player.getPosition().y,Player.getPosition().z)||pull(82, 5, 3,Player.getPosition().x,Player.getPosition().y,Player.getPosition().z)||pull(85, 5, 3,Player.getPosition().x,Player.getPosition().y,Player.getPosition().z)){
			bloodNetwork.getBlood(200);
		}
	});
/*sigilActivation(IDData.item.sigilOfSuppressionActive, function(){
			for(var x = -5; x<6; x++){
				for(var y = -5; y<6; y++){
					for(var z = -5 ; z<6; z++){
						if(x*x+y*y+z*z<=25){
							var xx = x+Player.getPosition().x;
							var yy = y+Player.getPosition().y;
							var zz = z+Player.getPosition().z;
							var getBlock=World.getBlock(xx,yy,zz).id;
							if(getBlock==8||getBlock==9){
								if(bloodNetwork.getBlood(10)){
									replaceLiquid.push({id:getBlock, x:xx, y:yy, z:zz});
								World.setBlock(xx,yy,zz,0);
								}				
							}
						}
					}
				}
			}
		});*/
		sigilActivation(IDData.item.hasteSigilActive, function(){
		if(World.getWorldTime()%5==0&&bloodNetwork.getBlood(1)){
			Entity.addEffect(Player.get(), Native.PotionEffect.movementSpeed, 2, 21, true, true);
		Entity.addEffect(Player.get(), Native.PotionEffect.jump, 1, 21, true, true);
		}
	});
	});

