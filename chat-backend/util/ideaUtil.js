const { Idea } = require("../model/db")

async function insertIdea(req, res){ 
     var idea = {}
     if(req.body.id == undefined){
     	idea = {
			title: req.body.title,
			topic: req.body.topic,
			content: req.body.content,
			owner: req.userId,
			publishable : req.params.type,
			likeCount: 0,
			dislikeCount: 0
		}
		ideaDb = await Idea.create(idea);
		res.status(201).send({message: "Idea is created", id: ideaDb.id})
     }else{
     	idea = req.body
     	await Idea.update(idea,{
	    	where : {
	      	  id : req.body.id
			}
		});
		res.status(200).send({message : "Idea is updated"})
     }
}

module.exports = {insertIdea}
