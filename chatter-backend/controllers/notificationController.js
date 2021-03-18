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

isNotification = async function(req,res){
	notification = await Notification.findOne({
 		where: {
 			target: req.userId
 		}
    });
    if(notification){
    	res.status(201).send({notification: true})
    }else{
    	res.status(201).send({notification: false})
    }
}


module.exports = {
    getNotifications,
    deleteNotification,
    isNotification
}
