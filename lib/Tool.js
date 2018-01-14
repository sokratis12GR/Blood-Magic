Tool = {
	add: function (id, block, properties) {
		Item.setToolRender (id, true);
	
		ToolAPI.registerTool (id, properties.material, block, properties);
		
		if (properties.enchant) {
			Item.setEnchantType (id, properties.enchant.type, properties.enchant.max);
		}
		if (properties.useItem) {
			Item.registerUseFunctionForID (id, properties.useItem);
		}
		
	},
};

registerAPIUnit ('Tool', Tool);
