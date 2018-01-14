IDRegistry.genBlockID("bloodLamp");
Block.createBlock("bloodLamp", [
	{name: "Blood Lamp (Is Tech)", texture: [["empty",0]], inCreative: false}
],BLOCK_TYPE_BLOOD_LAMP);
IDRegistry.genBlockID("phantomBlock");
Block.createBlock("phantomBlock", [
	{name: "Phantom Block", texture: [["blood_rune",0]], inCreative: false}
],BLOCK_TYPE_PHANTOM_BLOCK);

Block.registerDropFunction("bloodLamp", function(coords, id, data, diggingLevel, toolLevel){
	return [[0, 0, 0]]; 
});
Block.setBlockShape(BlockID.bloodLamp, {x: 0.3, y: 0.3, z: 0.3}, {x: 0.7, y: 0.7, z: 0.7});
Block.registerDropFunction("phantomBlock", function(coords, id, data, diggingLevel, toolLevel){
	return [[0, 0, 0]]; 
});
Block.registerDropFunction("bloodLamp", function(coords, id, data, diggingLevel, toolLevel){
	return [[0, 0, 0]]; 
});
Callback.addCallback("tick",function(){
	for(var i in phantomArray){
		if(phantomArray[i].time>0){
			phantomArray[i].time--;
		}
		if(phantomArray[i].time==0){
			World.setBlock(phantomArray[i].x,phantomArray[i].y,phantomArray[i].z,0);
			delete phantomArray[i];
		}
	}
	});
	
	Callback.addCallback("ItemUse",function(coords, item, block){
		if(item.id<256&&block.id==BlockID.phantomBlock){
			Game.prevent();
			World.setBlock(coords.x, coords.y, coords.z, item.id, item.data);
			for(var i in phantomArray){
				if(phantomArray[i].x==coords.x&&phantomArray[i].y==coords.y&&phantomArray[i].z==coords.z){
					delete phantomArray[i];
				}
			}
		}
		});
