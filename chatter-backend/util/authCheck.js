const jwt = require('jsonwebtoken')


authCheckMiddleware = (req,res,next) => {
    var secret =  "USER_CAN_ACCESS_SECRET";
    const bearerHeader = req.headers['authorization']
    if(!bearerHeader){
        return res.status(403).send()
    }
    const bearer = bearerHeader.split(' ')
    const accessToken = bearer[1]
    if(accessToken == null){
        return res.status(403).send()
    }
    if(req.body.action == "validation"){
    	secret = "USER_SIGNUP_SECRET"
    }
    jwt.verify(accessToken, secret, 
    (err, id) => {
    	if(err){
      	  return res.status(403).send(err.message)
    	}
   		req.userId = id
   		if(req.login == undefined)
			next()
	});
}


createJwt = (id, secret) => {
    return jwt.sign(id, secret);
}


module.exports = {
    authCheckMiddleware,
    createJwt
}
