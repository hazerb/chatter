const { Notification, User, Idea } = require("../model/db")


getNotifications = async function(req,res){
	let userId = req.userId
	notifications = await Notification.findAll({
        where: {
	    	target: userId,
        },
        include: [
        	{
        		model: User,
        		attributes: ['name', 'surname']
        	},
        	{
        		model: Idea,
        		attributes: ['title']
        	}
        
        ],
        order: [['createdAt', 'DESC']]
    });
	res.status(201).send(notifications)
}

deleteNotification = async function(req,res){
	notification = await Notification.destroy({
        where: {
	    	id: req.params.id,
        },
    });
	res.status(201).send({message: "notification is deleted"})
}


module.exports = {
    getNotifications,
    deleteNotification
}
