const { Idea, Save, Like, SharedTopic, User } = require("../model/db")
const { Op, Sequelize } = require("sequelize");

addIdea = async function(req,res){
	let topic = req.body.topic;
    let idea = {
		owner: req.userId,
		topic,
		title: req.body.title,
		content: req.body.content,
		publishable: req.params.type,
		likeCount: 0,
		dislikeCount: 0,
		commentCount: 0
	}	
	ideaDb = await Idea.create(idea);
	await SharedTopic.increment({count: 1}, {where:{topic,}})
	await User.increment({ideaCount: 1}, {where: {id: req.userId}})
	res.status(201).send({message: "Idea is created", id: ideaDb.id})
}


getNewIdea = async function(req,res){
	let userId = req.userId;
	let topic = req.params.topic
	let limit = Number(req.params.count)
	ideas = await Idea.findAll({
        where : {
	    	[Op.not]: [{owner : req.userId}],
	    	topic,
            publishable: 1
        },
        include: [
        	{
        		model: User,
        		attributes: ['name', 'surname']
        	}
        ],
        attributes : ['id', 'title','topic','content', 'likeCount', 'dislikeCount','owner'],
        order: Sequelize.literal('rand()'),
        limit,
    });
    res.status(201).send(ideas)
}

getOwnIdea = async function(req,res){
	let ownerId = req.userId
	ideas = await Idea.findAll({
        where : {
	    	owner: ownerId
        },
        include: [
        	{
        		model: User,
        		attributes: ['name', 'surname']
        	}
        ],
    });
    res.status(201).send(ideas)
}

getTheIdea = async function(req,res){
	let ideaId = req.params.id
	ideas = await Idea.findOne({
        where : {
	    	id: ideaId
        },
        include: [
        	{
        		model: User,
        		attributes: ['name', 'surname']
        	}
        ],
    });
    res.status(201).send(ideas)
}


getSavedIdea = async function(req,res){
	let userId = req.userId
	saves = await Save.findAll({
        where : {
	    	userId,
        },
        include: [
        	{
        		model: Idea,
        		required: true,
        		as: "idea"	
        	},
        	{
        		model: User,
        		attributes: ['name', 'surname'],
        		as: "user"
        	}
        ],
    });
    res.status(201).send(saves)
}

getLikedIdea = async function(req,res){
	let userId = req.userId
	likedIdeas = await Like.findAll({
        where : {
	    	userId,
        },
        include: [
        	{
        		model: Idea,
        		as: "idea"
        	},
        	{
        		model: User,
        		attributes: ['name', 'surname'],
        		as: "user"
        	}
        ],
    });
    console.log(likedIdeas)
    res.status(201).send(likedIdeas)
}


module.exports = {
	addIdea,
	getNewIdea,
	getOwnIdea,
	getTheIdea,
	getSavedIdea,
	getLikedIdea
}
