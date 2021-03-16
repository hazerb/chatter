const { User, Comment, Idea, Notification } = require("../model/db")
const { Op, Sequelize } = require("sequelize");

addComment = async function(req,res){
    let ideaId = req.body.ideaId;
    let userId = req.userId
    let comment = {
		commenterId: userId,
		ideaId,
		content: req.body.content
	}	
	comment = await Comment.create(comment);
	user = await Idea.findOne({
        where: {
	    	id: ideaId,
        },
        attributes: ['owner'],
    });
    let owner = user.owner
	await User.increment({popularity: 1},{where: {id: owner}})
	await Idea.increment({commentCount: 1}, {where:{id: ideaId}})
	let notification = {
		actor: userId,
		action: 3,
		target: owner,
		subject: ideaId
	}
	console.log("alllaaahh")
	await Notification.create(notification)
	res.status(201).send({message: "Comment is created", id: comment.id})
}

getComment = async function(req,res){
	let ideaId = req.params.ideaId;
	comments = await Comment.findAll({
        where: {
	    	ideaId,
        },
        attributes: ['content','createdAt'],
		include: [
			{
				model: User,
				attributes: ['name', 'surname'],
				required: false
			}	
		]
    });
	console.log(comments);
    res.status(201).send(comments);
}


module.exports = {
	addComment,
	getComment
}
