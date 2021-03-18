const { Like, Dislike, Save } = require("../model/db")

async function checkLike(userId,ideaId){ 
	like = await Like.findOne({
        where : {
	    	userId,
	    	ideaId,
        }
    });
	if(like){
        return true
    }
    return false
}

async function checkDislike(userId,ideaId){ 
	dislike = await Dislike.findOne({
        where : {
	    	userId,
	    	ideaId,
        }
    });
	if(dislike){
        return true
    }
    return false
}

async function checkSave(userId,ideaId){ 
	save = await Save.findOne({
        where : {
	    	userId,
	    	ideaId,
        }
    });
	if(save){
        return true
    }
    return false
}

module.exports = {checkLike, checkDislike, checkSave}
