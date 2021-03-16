const { User } = require("../model/db")


getUser = async function(req,res){
    users = await User.findAll({
        attributes : ['id', 'name','surname'],
    });
   	for(const user of users){
    	user.dataValues.title = user.dataValues.name + " " + user.dataValues.surname
    }
  	res.status(201).send(users);
}


module.exports = {
	getUser
}
