var playerBloodMaxAmount=0;
var playerBloodAmount=0;
Saver.addSavesScope("playerBloodMaxAmount",
	function read(scope){
		if(scope&&scope.amount)playerBloodMaxAmount = scope.amount;
	},
	
	function save(){
		return {amount:playerBloodMaxAmount};
	}
);
Saver.addSavesScope("playerBloodAmount",
 function read(scope){
 if(scope&&scope.amount)playerBloodAmount = scope.amount;
 },
 
 function save(){
  return {amount: playerBloodAmount};
 }
);
var bloodNetwork={
	addBlood:function(count){
		playerBloodAmount= Math.min(playerBloodAmount+count, playerBloodMaxAmount);
	},
	getBlood:function(count){
		if(count>playerBloodAmount){
			return false;
		}
		if(count<=playerBloodAmount){
			playerBloodAmount-=count;
			return true;
		}
	},
	getAmountBlood:function(){
		return playerBloodAmount;
	},
	getMaxBloodAmount:function(){
		return playerBloodMaxAmount;
	},
	setBloodAmount:function(count){
		playerBloodAmount=count;
	},
	addMaxBloodAmount:function(count){
		playerBloodMaxAmount+=count;
	},
	getMaxBlood:function(count){
		playerBloodMaxAmount=Math.max(playerBloodMaxAmount-= count*maxBlood,0);
	}
};

function addBloodParticle(x,y,z, count){
	for( var i = 0; i<=count; i++){
		Particles.addFarParticle(10,x+Math.random(), y+Math.random()/2, z+Math.random(),0,0,0,0);
	}
}

var replaceInWorkbench =[];
var backItemToWorkbench={
	addReplace:function(id, data, Id, Data){
		replaceInWorkbench.push({id:id, data:data, replaceId:Id, replaceData:Data});
	},
	getReplace:function(id, data){
		for(var i in replaceInWorkbench){
			if(replaceInWorkbench[i].id==id&&replaceInWorkbench[i].data==data){
				return {id:replaceInWorkbench[i].replaceId,data:replaceInWorkbench[i].replaceData};
			}
		}
	},
	getReplaceable:function(id, data){
		for(var i in replaceInWorkbench){
			if(replaceInWorkbench[i].id==id&&replaceInWorkbench[i].data==data){
				return true;
			}
		}
	}
};
var backWorkbench = function(api, field, result){
	for (var i in field){
		var id =field[i].id;
			var data =field[i].data;
		
		if(backItemToWorkbench.getReplaceable(field[i].id, field[i].data)){
			//Player.addItemToInventory(backItemToWorkbench.getReplace(field[i].id, field[i].data).id, 1, backItemToWorkbench.getReplace(field[i].id,field[i].data).data);
			field[i].id=backItemToWorkbench.getReplace(field[i].id, field[i].data).id;
			field[i].data=backItemToWorkbench.getReplace(field[i].id, field[i].data).data;
			/*field[i].id=field[i].replaceId;
			field[i].data=field[i].replaceData;*/
		}else{
			api.decreaseFieldSlot(i);
		}
	};
}

backItemToWorkbench.addReplace(325,8,325,0);
backItemToWorkbench.addReplace(325,10,325,0);

var altarBloodRecipe =[];
function AddBloodRecipe(id, data, time, blood, tier, resultId, resultData, define){
	altarBloodRecipe.push({id:id, data:data, time:time, blood:blood, tier:tier, resultId:resultId, resultData:resultData, define:define});
}
var getGameMode = ModAPI.requireGlobal("Level.getGameMode");

function sigilDeactivation(id, id2, click){
	if(click==id){
		Player.setCarriedItem(id2,1,0);
	}
	if(click==id2){
		Player.setCarriedItem(id,1,0);
	}
}

function sigilActivation(id, define){
	for (var i =0; i<36; i++){
		if(Player.getInventorySlot(i).id==id){
			define();
		}
	}
}

function pull(id,r,speed, X, Y, Z){
	var mobs=Entity.getAll();
for(var i =0; i<mobs.length; i++){
if(Entity.getType(mobs[i])==id){
	
var x=Entity.getPosition(mobs[i]).x-X;
var y=Entity.getPosition(mobs[i]).y-Y;
var z=Entity.getPosition(mobs[i]).z-Z;
if(x*x+y*y+z*z<r*r){
	Entity.setVelocity (mobs[i],x*speed, y*speed, z*speed);
	return true;
	}
	}
	}
	}


var getSneaking = ModAPI.requireGlobal("Entity.isSneaking");
var phantomArray=[];
var replaceLiquid=[];
