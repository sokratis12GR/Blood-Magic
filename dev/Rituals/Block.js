IDRegistry.genBlockID("imperfectRitualStone");
Block.createBlock("imperfectRitualStone", [
	{name: "Imperfect Ritual Stone", texture: [["imperfect_ritual_stone",0]], inCreative: true}
],BLOCK_TYPE_BLOOD_ALTAR);
IDRegistry.genBlockID("ritualStone");
Block.createBlock("ritualStone", [
	{name: "Ritual Stone", texture: [["ritual_stone",0]], inCreative: true}
],BLOCK_TYPE_BLOOD_ALTAR);
IDRegistry.genBlockID("masterRitualStone");
Block.createBlock("masterRitualStone", [
	{name: "Master Ritual Stone", texture: [["master_ritual_stone",0]], inCreative: true}
],BLOCK_TYPE_BLOOD_ALTAR);
IDRegistry.genBlockID("AirRitualStone");
Block.createBlock("AirRitualStone", [
	{name: "Air Ritual Stone", texture: [["air_ritual_stone",0]], inCreative: true}
],BLOCK_TYPE_BLOOD_ALTAR);
IDRegistry.genBlockID("WaterRitualStone");
Block.createBlock("WaterRitualStone", [
	{name: "Water Ritual Stone", texture: [["water_ritual_stone",0]], inCreative: true}
],BLOCK_TYPE_BLOOD_ALTAR);
IDRegistry.genBlockID("EarthRitualStone");
Block.createBlock("EarthRitualStone", [
	{name: "Earth Ritual Stone", texture: [["earth_ritual_stone",0]], inCreative: true}
],BLOCK_TYPE_BLOOD_ALTAR);
IDRegistry.genBlockID("FireRitualStone");
Block.createBlock("FireRitualStone", [
	{name: "Fire Ritual Stone", texture: [["fire_ritual_stone",0]], inCreative: true}
],BLOCK_TYPE_BLOOD_ALTAR);
IDRegistry.genBlockID("DuskRitualStone");
Block.createBlock("DuskRitualStone", [
	{name: "Dusk Ritual Stone", texture: [["dusk_ritual_stone",0]], inCreative: true}
],BLOCK_TYPE_BLOOD_ALTAR);
IDRegistry.genBlockID("DownRitualStone");
Block.createBlock("DownRitualStone", [
	{name: "Down Ritual Stone", texture: [["light_ritual_stone",0]], inCreative: true}
],BLOCK_TYPE_BLOOD_ALTAR);

Translation.addTranslation("Imperfect Ritual Stone", {ru: "Несовершенный Ритуальный Камень"});
Translation.addTranslation("Ritual Stone", {ru: "Ритуальный Камень"});
Translation.addTranslation("Master Ritual Stone", {ru: "Ритуальный Камень Мастера"});

TileEntity.registerPrototype(BlockID.masterRitualStone, {
	defaultValues:{
		activate:true,
		select:null
	},
	tick: function(){
		if(World.getWorldTime()%20==0&&this.data.select!==null&&this.data.activate){
			this.data.select=Ritual.checkRitual(this.x, this.y, this.z);
		}
		if(this.data.select!=null&&this.data.activate){
			this.data.select.define(this.x,this.y,this.z);
		}
	},
	redstone:function(params){
		if(params.power){
			this.data.activate=false;
		}else{
			this.data.activate=true;
		}
	},
	init: function(){
			if(this.data.select){
		this.data.select = Ritual.ritualByName(this.data.select.name);
		}
	},
	click: function(){
		if(Player.getCarriedItem().id==IDData.item.ritualDiviner){
			
		}	
		if(Player.getCarriedItem().id==IDData.item.weakActivationCrystal){
			var check = Ritual.checkRitual(this.x, this.y, this.z);
			if(check){
				Game.message(check.name);
				if(check.time){
				this.data.select=check;
				bloodNetwork.getBlood(check.LP);
				for( var d =0; d<20; d++){
				Particles.addParticle(this.x+Math.random(), this.y+Math.random()/2+1, this.z+Math.random(), 9, 0, 0, 0,1);
			}
			}if(check.time==false){
				check.define(this.x, this.y, this.z);
			}
			}
		}	
	}
});

