const { User } = require("../model/db")
const { createJwt } = require("../util/authCheck")


validate = async function(req, res) {
    let code = req.body.code
    var user = await User.findOne({
        where: {
            id: req.userId
        }
    })
    if(user != null && code === user.validation) {
        try {
        	await User.update({isValidated: 1}, {
	    		where : {
	       			id : req.userId
				},
			});
            return res.status(200).send({message: "Validation is successful", token: createJwt(req.userId, "USER_CAN_ACCESS_SECRET")})
        }
        catch(e) {
            return res.status(400).send({message: "Something went wrong"})
        }
    }
    else {
        return res.status(400).send({message: "Validation code is wrong"})
    }
}

module.exports = {
    validate
}
