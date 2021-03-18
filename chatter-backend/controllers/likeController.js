const { Idea, Like, Dislike, Save, User, Notification } = require("../model/db")
const { Op, Sequelize } = require("sequelize");
const likeUtil = require("../util/likeUtil")

like = async function(req,res){
	let userId = req.userId
	let ideaId = req.body.id
	let target = req.body.ownerId
    let like = {
		userId,
		ideaId,
		target
	}
	likeDb = await Like.create(like);
	await User.increment({popularity: 1}, {where: {id: target }})
	await Idea.increment({likeCount: 1}, {where:{id: ideaId}})
	let notification = {
		actor: userId,
		action: 1,
		target: target,
		subject: ideaId
	}
	await Notification.create(notification)
	res.status(201).send({message: "Idea is liked"})
}

notLike = async function(req,res){
	let userId = req.userId
	let ideaId = req.params.id
	await Like.destroy({
	    where : {
			userId,
			ideaId
	    }
	});
	user = await Idea.findOne({
        where: {
	    	id: ideaId,
        },
        attributes: ['owner'],
    });
	await User.decrement({popularity: 1}, {where: {id: req.params.ownerId}})
	await Idea.decrement({likeCount: 1}, {where:{id: ideaId}})
	res.status(201).send({message: "Idea is notLiked"})
}

dislike = async function(req,res){
	let userId = req.userId
	let ideaId = req.body.id
	let target = req.body.ownerId
    dislike = {
		userId,
		ideaId,
	}
	dislikeDb = await Dislike.create(dislike);
	await User.increment({popularity: 1}, {where: {id: target }})
	await Idea.increment({dislikeCount: 1}, {where:{id: ideaId}})
	let notification = {
		actor: userId,
		action: 2,
		target: target,
		subject: ideaId
	}
	await Notification.create(notification)
	res.status(201).send({message: "Idea is disliked"})
}

notDislike = async function(req,res){
	let userId = req.userId
	let ideaId = req.params.id
	await Dislike.destroy({
	    where : {
			userId,
			ideaId
	    }
	});
	await User.decrement({popularity: 1}, {where: {id: req.params.ownerId }})
	await Idea.decrement({dislikeCount: 1}, {where:{id: ideaId}})
	res.status(201).send({message: "Idea is created"})
}

save = async function(req,res){
	let userId = req.userId
	let ideaId = req.body.id
	let target = req.body.ownerId
    save = {
		userId,
		ideaId,
		target
	}
	saveDb = await Save.create(save);
	await User.increment({popularity: 1}, {where: {id: target }})
	res.status(201).send({message: "Idea is saved"})
}

isActioned= async function(req,res){
	let userId = req.userId
	let ideaId = req.params.id
	isLiked = await likeUtil.checkLike(userId,ideaId)
	isDisliked = await likeUtil.checkDislike(userId,ideaId)
	isSaved = await likeUtil.checkSave(userId,ideaId)
	let response = {
		isLiked,
		isDisliked,
		isSaved
	}
	res.status(201).send(response)
}


module.exports = {
    like,
    dislike,
    save,
    isActioned,
    notLike,
    notDislike
}
