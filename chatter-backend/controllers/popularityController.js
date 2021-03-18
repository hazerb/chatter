const { SharedTopic, User } = require("../model/db")


getTopic = async function(req,res){
   topics = await SharedTopic.findAll({
        order: [
        	['count', 'DESC']
        ],
        limit: 7
    });
	res.status(201).send(topics)
}

getUser = async function(req,res){
   users = await User.findAll({
        order: [
        	['popularity', 'DESC']
        ],
        limit: 7
    });
	res.status(201).send(users)
}

module.exports = {
	getTopic,
	getUser,
}
