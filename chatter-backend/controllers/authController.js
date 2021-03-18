const mailController = require("../util/mailController")
const { hashPassword, compare } = require("../util/passwordUtil")
const { createJwt } = require("../util/authCheck")
const jwt = require('jsonwebtoken')
const { User } = require("../model/db")
const { authCheckMiddleware } = require('../util/authCheck')

login = async function(req, res, next){
    var loggingUser = await User.findOne({
        where: {
            email: req.body.email
        }
    })
    if(loggingUser != null){
    	if(loggingUser.isValidated == 1){
        	let isSame = await compare(req.body.password, loggingUser.password)
        	if(isSame){
            	const token = createJwt(loggingUser.id, "USER_CAN_ACCESS_SECRET")
            	return res.status(200).send({message: "Success", accessToken: token, id: loggingUser.id})
        	}
        	return res.status(401).send({message: "Wrong password"})
        }
        return res.status(401).send({message: "User is not validated"})
    }
    return res.status(404).send({message: "User not found"})
}


signup = async function(req,res) {
    const validationCode = mailController.createValidationCode()
    const password= await hashPassword(req.body.password)
    var userData = {
        email: req.body.email,
        age: req.body.age,
        password,
        name: req.body.name,
        surname: req.body.surname,
        validation: validationCode,
        popularity: 0,
        ideaCount: 0,
        isValidated: 0
    }
    try{
        try{
            userDb = await User.create(userData)
        }catch(error){
            return res.status(400).send({error: "This mail address is already used"})
        }
        mailController.sendValidationCode(userData.email, validationCode)
        const token = createJwt(userDb.id,"USER_SIGNUP_SECRET")
        res.status(201).send({message: "User created", accessToken: token, id: userDb.id})
    }catch (error) {
        console.log(error.message);
        res.status(400).send({error: "Something went wrong."})
    }    
}

jwtValidation = async function(req, res) {
    token = req.body.token
    try {
        jwt.verify(token, "USER_CAN_ACCESS_SECRET",
        (err, id) => {
            if(err){
                return res.status(400).send({message: "Token has expired"})
            }
            return res.status(200).send({message: "Token is valid"})
        })
    }
    catch(e){
        return res.status(400).send("Token is invalid.")
    }
}

module.exports = {
    login,
    signup,
    jwtValidation
};
