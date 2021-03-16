const { User } = require("../model/db")


getProfile = async function(req,res){
	let id = req.params.id;
    profile = await User.findOne({
        where : {
	    	id,
        },
        attributes : ['id', 'name','surname','instagram', 'age', 'popularity','ideaCount'],
    });
	res.status(201).send(profile)
}

module.exports = {
	getProfile
}

//	await new Promise(r => setTimeout(r, 2000));
