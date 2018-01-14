var BLOCK_TYPE_BLOOD_ALTAR = Block.createSpecialType({
	base: 1,
	opaque: true,
	explosionres: 15,
	destroytime: 2,
	redstoneconsumer: true
});
var BLOCK_TYPE_BLOOD_LAMP = Block.createSpecialType({
	base: 50,
	opaque: false,
	explosionres: 1,
	redstoneconsumer: false,
	lightlevel:13
});
var BLOCK_TYPE_PHANTOM_BLOCK = Block.createSpecialType({
	base: 20,
	opaque: false,
	explosionres: 1,
renderlayer:2
});

