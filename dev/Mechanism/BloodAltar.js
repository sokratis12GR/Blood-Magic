IDRegistry.genBlockID("bloodAltar");
Block.createBlock("bloodAltar", [
	{name: "Blood Altar", texture: [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0],["blood_altar", 0],["blood_altar", 0],["blood_altar", 0],["blood_altar", 0],["blood_altar", 2],["blood_altar", 0],["blood_altar", 0],["blood_altar", 0],["blood_altar", 0]], inCreative: true},
	{name: "Blood Altar", texture: [["blood_altar", 0],["blood_altar", 2],["blood_altar", 0],["blood_altar", 0],["blood_altar", 0],["blood_altar", 0],["blood_altar", 0],["blood_altar", 2],["blood_altar", 0],["blood_altar", 0],["blood_altar", 0],["blood_altar", 0]], inCreative: false}
],BLOCK_TYPE_BLOOD_ALTAR);

Translation.addTranslation("Blood Altar", {ru: "Алтарь Крови"});

Recipes.addShaped({id: IDData.block.bloodAltar, count: 1, data: 0}, ["pap", "pup", "hgh"], ["h", 266,0,"p", 1, 0, "g", 264, -1, "u", 61, -1]);


var bloodAnimationTexture = new Texture("blood_animation_0.png").setResolution(16,16);
var bloodAnimationModel = new EntityModel(bloodAnimationTexture);
bloodAnimationModel.setTexture(bloodAnimationTexture);
var bloodAnimationRender = new Render();
bloodAnimationModel.createAnimation(1, function(frame) {
    var partObj = [{type: "box", coords: {x: 0, y: 0, z: 0}, size: {x: 10, y: 3, z: 10},uv: {x: 0,y: 0}}
    ];

    bloodAnimationRender.setPart("body", partObj, {});
    return bloodAnimationRender;
}, 0.5);

var altarBlock=[IDData.block.bloodRune,IDData.block.speedRune, IDData.block.selfSacrificeRune,IDData.block.sacrificeRune, IDData.block.capacityAltarRune,IDData.block.dislocationRune];
var getTier={
	
	getBlock:function(x,y,z){
		for(var i in altarBlock){
			if(World.getBlock(x, y, z).id==altarBlock[i]){
				return true;
			}
		}
		return false;
	},
	getUpgrade:function(x,y,z){
		if(this.getBlock(x,y,z)&&World.getBlock(x, y, z).id==IDData.block.speedRune){
			return {speed:.2};
		}else if(this.getBlock(x,y,z)&&World.getBlock(x, y, z).id==IDData.block.selfSacrificeRune){
			return {selfSacrifice:.1};
		}else if(this.getBlock(x,y,z)&&World.getBlock(x, y, z).id==IDData.block.capacityAltarRune){
			return {augmentCapacity: 2000};
		}else if(this.getBlock(x,y,z)&&World.getBlock(x, y, z).id==IDData.block.sacrificeRune){
			return {sacrifice:.1};
		}else if(this.getBlock(x,y,z)&&World.getBlock(x, y, z).id==IDData.block.dislocationRune){
			return {dislocation:1};
		}else{
			return {};
		}
	},
	plusEffect:function(f,x,y,z){
		var s =this.getUpgrade(x,y,z);
		if(!(s.speed===undefined)){
			f.speed+=s.speed;
		}
		/*if("capacity" in s){
			f.capacity+=s.capacity;
		}*/
		if("sacrifice" in s){
			f.sacrifice+=s.sacrifice;
		}
		if(!(s.selfSacrifice===undefined)){
			f.selfSacrifice+=s.selfSacrifice;
		}
		if("dislocation" in s){
			f.dislocation+=s.dislocation;
		}
		if("augmentCapacity" in s){
			f.augmentCapacity+=s.augmentCapacity;
		}
	},
	Level2:function(x,y,z){
		if(this.getBlock(x+1,y,z)&&this.getBlock(x-1,y,z)&&this.getBlock(x,y,z+1)&&this.getBlock(x,y,z-1)&&this.getBlock(x+1,y,z+1)&&this.getBlock(x+1,y,z-1)&&this.getBlock(x-1,y,z-1)&&this.getBlock(x-1,y,z+1)){
			var effect = {speed:0,capacity:0, sacrifice:0, selfSacrifice:0, dislocation:0, augmentCapacity:0};
			this.plusEffect(effect,x+1,y,z);
			this.plusEffect(effect,x-1,y,z);
			this.plusEffect(effect,x,y,z+1);
			this.plusEffect(effect,x,y,z-1);
			return [true,effect];
		}else{
			return false;
		}
	},
	Level3:function(x,y,z){
		if(this.getBlock(x-3,y-1,z+1)&&this.getBlock(x-3,y-1,z+2)&&this.getBlock(x-3,y-1,z-1)&&this.getBlock(x-3,y-1,z-2)&&this.getBlock(x-3,y-1,z)&&this.getBlock(x+3,y-1,z+1)&&this.getBlock(x+3,y-1,z+2)&&this.getBlock(x+3,y-1,z-1)&&this.getBlock(x+3,y-1,z-2)&&this.getBlock(x+3,y-1,z)&&this.getBlock(x,y-1,z-3)&&this.getBlock(x+1,y-1,z-3)&&this.getBlock(x+2,y-1,z-3)&&this.getBlock(x-1,y-1,z-3)&&this.getBlock(x-2,y-1,z-3)&&this.getBlock(x,y-1,z+3)&&this.getBlock(x+1,y-1,z+3)&&this.getBlock(x+2,y-1,z+3)&&this.getBlock(x-1,y-1,z+3)&&this.getBlock(x-2,y-1,z+3)&&World.getBlock(x-3,y,z-3).id!=0&&World.getBlock(x+3,y,z-3).id!=0&&World.getBlock(x-3,y,z+3).id!=0&&World.getBlock(x+3,y,z+3).id!=0&&World.getBlock(x-3,y+1,z-3).id!=0&&World.getBlock(x+3,y+1,z-3).id!=0&&World.getBlock(x-3,y+1,z+3).id!=0&&World.getBlock(x+3,y+1,z+3).id!=0&&World.getBlock(x-3,y+2,z-3).id==89&&World.getBlock(x+3,y+2,z-3).id==89&&World.getBlock(x-3,y+2,z+3).id==89&&World.getBlock(x+3,y+2,z+3).id==89){
			var effect = {speed:0,capacity:0, sacrifice:0, selfSacrifice:0, dislocation:0, augmentCapacity:0};
			this.plusEffect(effect,x+1,y,z-1);
			this.plusEffect(effect,x+1,y,z+1);
			this.plusEffect(effect,x-1,y,z+1);
			this.plusEffect(effect,x-1,y,z-1);
			this.plusEffect(effect,x+3,y-1,z);
			this.plusEffect(effect,x+3,y-1,z+1);
			this.plusEffect(effect,x+3,y-1,z+2);
			this.plusEffect(effect,x+3,y-1,z-1);
			this.plusEffect(effect,x+3,y-1,z-2);
			this.plusEffect(effect,x-3,y-1,z);
			this.plusEffect(effect,x-3,y-1,z+1);
			this.plusEffect(effect,x-3,y-1,z+2);
			this.plusEffect(effect,x-3,y-1,z-1);
			this.plusEffect(effect,x-3,y-1,z-2);
			this.plusEffect(effect,x+1,y-1,z+3);
			this.plusEffect(effect,x,y-1,z+3);
			this.plusEffect(effect,x+2,y-1,z+3);
			this.plusEffect(effect,x-1,y-1,z+3);
			this.plusEffect(effect,x-2,y-1,z+3);
			this.plusEffect(effect,x+1,y-1,z-3);
			this.plusEffect(effect,x,y-1,z-3);
			this.plusEffect(effect,x+2,y-1,z-3);
			this.plusEffect(effect,x-1,y-1,z-3);
			this.plusEffect(effect,x-2,y-1,z-3);
			return [true,effect];
		}else{
			return false;
		}
	},
	getBlockInLine:function(x,y,z,vectorX, vectorY, vectorZ){ 
		for(var xx = 0; xx<=vectorX;xx++){
			for(var yy = 0; yy<=vectorY;yy++){
				for(var zz = 0; zz<=vectorZ;zz++){
					if(!this.getBlock(xx+x, yy+y, zz+z)){
						return false;
					}
				}
			}
		}
		return true;
	},
	plusEffectInLine:function(effect, x,y,z, vX, vY, vZ){
		var Effect = {speed:0,capacity:0, sacrifice:0, selfSacrifice:0, dislocation:0, augmentCapacity:0};
		for(var xx = 0; xx<=vX;xx++){
			for(var yy = 0; yy<=vY;yy++){
				for(var zz = 0; zz<=vZ;zz++){
					this.plusEffect(Effect, xx+x, yy+y, zz+z);
				}
			}
		}
		if(!(Effect.speed===undefined)){
			effect.speed+=Effect.speed;
		}
		if("sacrifice" in Effect){
			effect.sacrifice+=Effect.sacrifice;
		}
		if(!(Effect.selfSacrifice===undefined)){
			effect.selfSacrifice+=Effect.selfSacrifice;
		}
		if("dislocation" in Effect){
			effect.dislocation+=Effect.dislocation;
		}
		if("augmentCapacity" in Effect){
			effect.augmentCapacity+=Effect.augmentCapacity;
		}
	},
	Level4:function(x,y,z){
		if(this.getBlockInLine(x-5, y-2, z-3, 0, 0, 6)&&this.getBlockInLine(x+5, y-2, z-3, 0, 0, 6)&&this.getBlockInLine(x-3, y-2, z-5, 6, 0, 0)&&this.getBlockInLine(x-3, y-2, z+5, 6, 0, 0)&&World.getBlock(x-5, y-1, z-5).id!=0&&World.getBlock(x+5, y-1, z-5).id!=0&&World.getBlock(x-5, y-1, z+5).id!=0&&World.getBlock(x+5, y-1, z+5).id!=0&&
		World.getBlock(x-5, y, z-5).id!=0&&World.getBlock(x+5, y, z-5).id!=0&&World.getBlock(x-5, y, z+5).id!=0&&World.getBlock(x+5, y, z+5).id!=0&&World.getBlock(x-5, y+1, z-5).id!=0&&World.getBlock(x+5, y+1, z-5).id!=0&&World.getBlock(x-5, y+1, z+5).id!=0&&World.getBlock(x+5, y+1, z+5).id!=0&&World.getBlock(x-5, y+2, z-5).id!=0&&World.getBlock(x+5, y+2, z-5).id!=0&&World.getBlock(x-5, y+2, z+5).id!=0&&World.getBlock(x+5, y+2, z+5).id!=0&&
		World.getBlock(x-5, y+3, z-5).id==IDData.block.largeBloodStoneBrick&&World.getBlock(x+5, y+3, z-5).id==IDData.block.largeBloodStoneBrick&&World.getBlock(x-5, y+3, z+5).id==IDData.block.largeBloodStoneBrick&&World.getBlock(x+5, y+3, z+5).id==IDData.block.largeBloodStoneBrick){
			var effect = {speed:0,capacity:0, sacrifice:0, selfSacrifice:0, dislocation:0, augmentCapacity:0};
			this.plusEffectInLine(effect,x-5, y-2, z-3, 0, 0, 6);
			this.plusEffectInLine(effect,x+5, y-2, z-3, 0, 0, 6);
			this.plusEffectInLine(effect,x-3, y-2, z-5, 6, 0, 0);
			this.plusEffectInLine(effect,x-3, y-2, z+5, 6, 0, 0);
			return [true,effect];
		}else{
			return false;
		}
	}
};

TileEntity.registerPrototype(BlockID.bloodAltar, {
	defaultValues: {
	id:0,
	data:0,
	recipe:null,
	speed:1,
	selfSacrifice:1,
	sacrifice:1,
	augmentCapacity:10000,
	dislocation:0,
	blood:0
	},
	animation:null,
	init:function(){
		this.animation = new Animation.Item(this.x+.5, this.y+0.75, this.z+.5);
		if(this.data.id!=0){
			this.animation.describeItem({
			id: this.data.id,
			count: 1,
			data: this.data.data,
			size: .3
		});
		this.animation.load();
		}
		
		this.bloodAnimation = new Animation.Base(this.x+.5, this.y+9/16+((this.data.blood/this.getBloodStorage())*2)/16, this.z+.5);
		this.bloodAnimation.describe({
			render: bloodAnimationRender.getId(),
			skin: "mob/blood_animation_0.png"
		});
		this.bloodAnimation.load();
	},
	tick: function(){
			if(World.getWorldTime()%100==0){
			var Tier2=getTier.Level2(this.x, this.y-1, this.z);
			var Tier3=getTier.Level3(this.x, this.y-1, this.z);
			var Tier4=getTier.Level4(this.x, this.y-1, this.z);
			if(Tier2[0]){
				this.data.tier=2;
				this.data.speed=Tier2[1].speed+1;
				this.data.selfSacrifice=Tier2[1].selfSacrifice+1;
				this.data.sacrifice=Tier2[1].sacrifice+1;
				this.data.augmentCapacity=Tier2[1].augmentCapacity+10000;
				this.data.dislocation=Tier2[1].dislocation;
				if(Tier3[0]){
					this.data.tier=3;
					this.data.speed=Tier3[1].speed+this.data.speed;
					this.data.selfSacrifice=Tier3[1].selfSacrifice+this.data.selfSacrifice;
					this.data.sacrifice=Tier3[1].sacrifice+this.data.sacrifice;
					this.data.augmentCapacity=Tier3[1].augmentCapacity+this.data.augmentCapacity;
					this.data.dislocation=Tier3[1].dislocation+this.data.dislocation;
					if(Tier4[0]){
					this.data.tier=4;
					this.data.speed=Tier4[1].speed+this.data.speed;
					this.data.selfSacrifice=Tier4[1].selfSacrifice+this.data.selfSacrifice;
					this.data.sacrifice=Tier4[1].sacrifice+this.data.sacrifice;
					this.data.augmentCapacity=Tier4[1].augmentCapacity+this.data.augmentCapacity;
					this.data.dislocation=20*Tier4[1].dislocation+this.data.dislocation;
				}
				}
			}else{
				this.data.tier=1;
			}
		}
		
		if(World.getWorldTime()%2==0){
			this.bloodAnimation.setPos(this.x+.5, this.y+((this.data.blood/this.getBloodStorage())*2)/16-5/6-0.26+0.032, this.z+.5);
		}
		
		if(this.data.progres<=0&&this.data.recipe){
			if(this.data.id!=ItemID.weakBloodOrb&&this.data.id!=ItemID.apprenticeBloodOrb&&this.data.id!=ItemID.magiciansBloodOrb&&this.data.id!=ItemID.masterBloodOrb){
			this.data.id=this.data.recipe.resultId;
			this.data.data=this.data.recipe.resultData;
			this.animation.describeItem({
			id: this.data.id,
			count: 1,
			data: this.data.data,
			size: .3
		});
		this.animation.load();
			this.data.recipe.define();	
			this.data.recipe=null;
			addBloodParticle(this.x,this.y+0.2,this.z, 20);
		}
	}
		if(this.recipe==null&&this.data.progress==0){
			if(this.data.id==ItemID.weakBloodOrb||this.data.id==ItemID.apprenticeBloodOrb||this.data.id==ItemID.magiciansBloodOrb||this.data.id==ItemID.masterBloodOrb){
				bloodNetwork.addBlood(5);
				this.data.blood= Math.max(this.data.blood-5,0);
				if(bloodNetwork.getMaxBloodAmount()>bloodNetwork.getAmountBlood()){
					if(Math.random()<0.05){
				Particles.addFarParticle(10,this.x+Math.random(), this.y+Math.random()/10+0.5, this.z+Math.random(),0,0,0,0);
			}
				}
			   }
		}
		if(this.data.progres>0&&this.data.blood>0&&this.data.id==this.data.recipe.id&&this.data.data==this.data.recipe.data&&this.data.tier>=this.data.recipe.tier){
			
			this.data.progres-=1*this.data.speed;
			this.data.blood= Math.max(this.data.blood-(this.data.recipe.blood/this.data.recipe.time)*this.data.speed,0);
			if(this.data.progres%10==0){
				Particles.addFarParticle(10,this.x+.25+Math.random()/2, this.y+Math.random()/10+0.5, this.z+.25+Math.random()/2,0,0,0,0);
			}
		}
		if(this.data.blood==0&&this.data.progres>0&&this.data.progres<=this.data.recipe.time-10&&this.data.id==this.data.recipe.id&&this.data.data==this.data.recipe.data){
			this.data.progres+=10;
			if(this.data.progres%40){
				Particles.addFarParticle(5,this.x+Math.random(), this.y+Math.random()/1+0.5, this.z+Math.random(),0,0,0,0);
			}
			}
	},
	getBloodStorage: function(){
		return this.data.augmentCapacity;
	},
	addBlood: function(count){
		if (this.data.blood < this.getBloodStorage()){
				this.data.blood = Math.round(Math.min(this.data.blood + count*this.data.selfSacrifice, this.getBloodStorage()));
			}
	},
	addBloodOther: function(count){
		if (this.data.blood < this.getBloodStorage()){
				this.data.blood = Math.round(Math.min(this.data.blood + count*this.data.sacrifice, this.getBloodStorage()));
			}
	},
	
	click: function(){
		Game.prevent();
		//TODO проверка приседания
		if(this.data.id!=0&&Player.getCarriedItem().id!=IDData.item.sacrificialKnife){
			World.drop(this.x+.5, this.y+1.2, this.z+.5, this.data.id, 1, this.data.data);
			this.data.id=0;
			this.data.data=0;
			this.animation.destroy();
		}else if(Player.getCarriedItem().id==ItemID.weakBloodOrb||Player.getCarriedItem().id==ItemID.apprenticeBloodOrb||Player.getCarriedItem().id==ItemID.magiciansBloodOrb||Player.getCarriedItem().id==ItemID.masterBloodOrb){
				 this.data.id=Player.getCarriedItem().id;
				this.data.data=Player.getCarriedItem().data;
			this.animation.describeItem({
			id: this.data.id,
			count: 1,
			data: this.data.data,
			size: .3
		});
			this.animation.load();
		Player.decreaseCarriedItem(1);
		this.data.progress=0;
				 }else if(Player.getCarriedItem().id!=IDData.item.sacrificialKnife){
				 
		for(var i in altarBloodRecipe){
			if(Player.getCarriedItem().id==altarBloodRecipe[i].id&&Player.getCarriedItem().data==altarBloodRecipe[i].data&&this.data.id==0){
				this.data.id=Player.getCarriedItem().id;
				this.data.data=Player.getCarriedItem().data;
				this.data.progres=altarBloodRecipe[i].time;
				this.data.recipe=altarBloodRecipe[i];
				Player.decreaseCarriedItem(1);
			this.animation.describeItem({
			id: this.data.id,
			count: 1,
			data: this.data.data,
			size: .3
		});
		this.animation.load();
				}
				}
			}	
	},
	destroy:function(){
		World.drop(this.x+.5, this.y+0.5, this.z+.5, this.data.id, 1, this.data.data);
		this.animation.destroy();
		addBloodParticle(this.x, this.y, this.z,10);
		this.bloodAnimation.destroy();
	}
});

var render = new ICRender.Model();

/*var render2 = new ICRender.Model();
BlockRenderer.setStaticICRender (BlockID.bloodAltar, 0, render);
BlockRenderer.setStaticICRender (BlockID.bloodAltar, 1, render2);
var model = BlockRenderer.createModel();

model.addBox (-1/8, 0, -1/8, 1/8, 1+1/16, 1/8,  [["blood_altar", 3],["blood_altar", 3],["blood_altar", 0]]);
model.addBox (-1/8, 0, 7/8, 1/8, 1+1/16, 9/8,  [["blood_altar", 3],["blood_altar", 3],["blood_altar",0]]);
model.addBox (7/8, 0, -1/8, 9/8, 1+1/16, 1/8,  [["blood_altar", 3],["blood_altar", 3],["blood_altar",0]]);
model.addBox (7/8, 0, 7/8, 9/8, 1+1/16, 9/8,  [["blood_altar", 3],["blood_altar", 3],["blood_altar", 0]]);

model.addBox (0, 0, 0, 1, 14/16, 1,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);

model.addBox (0, 14/16, 0, 5/16, 15/16, 1,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (11/16, 14/16, 0, 1, 15/16, 1,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (5/16, 14/16, 0, 11/16, 15/16, 5/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (5/16, 14/16, 11/16, 11/16, 15/16, 1,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);

model.addBox (5/16, 14/16, 5/16, 6/16, 15/16, 6/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (10/16, 14/16, 10/16, 11/16, 15/16, 11/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (10/16, 14/16, 5/16, 11/16, 15/16, 6/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (5/16, 14/16, 10/16, 6/16, 15/16, 11/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);



model.addBox (0, 15/16, 0, 3/16, 1, 1,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (13/16, 15/16, 0, 1, 1, 1,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (3/16, 15/16, 0, 13/16, 1, 3/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (3/16, 15/16, 13/16, 13/16, 1, 1,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);

model.addBox (3/16, 15/16, 3/16, 5/16, 1, 4/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (11/16, 15/16, 12/16, 13/16, 1, 13/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (3/16, 15/16, 12/16, 5/16, 1, 13/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (11/16, 15/16, 3/16, 13/16, 1, 4/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);

model.addBox (3/16, 15/16, 4/16, 4/16, 1, 5/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (12/16, 15/16, 4/16, 13/16, 1, 5/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (3/16, 15/16, 11/16, 4/16, 1, 12/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);
model.addBox (12/16, 15/16, 11/16, 13/16, 1, 12/16,  [["blood_altar", 0],["blood_altar", 1],["blood_altar", 0]]);

render.addEntry(model);
*/

var mesh = new RenderMesh();
mesh.setBlockTexture("altar", 0);
mesh.importFromFile(__dir__ + "model/bloodaltar.obj", "obj", {scale:[1/12, 1/12, 1/12],translate: [0.5, 0, 0.5]});
var blockModel = new BlockRenderer.Model(mesh);
render.addEntry(blockModel);
BlockRenderer.setStaticICRender (BlockID.bloodAltar, 0, render);