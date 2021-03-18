const nodemailer = require("nodemailer")

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "chatter.app.help@gmail.com",
        pass: "chatter123_"
    },
})


var createValidationCode = function() {
    return Math.floor(Math.random() * (1000000 - 0)).toString().padStart(6,"0")
}

var sendValidationCode = function(email, code) {
    var mailOptions = {
        from: "chatter.app.help@gmail.com",
        to: email,
        subject: "Chatter - Validation Code",
        text: "WELCOME TO THE CHATTER. Your verification code is : " + code
    }
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }
        else {
            //console.log('email sent: ' + info.response)
        }
    })
}

module.exports = {
    sendValidationCode,
    createValidationCode,
}
