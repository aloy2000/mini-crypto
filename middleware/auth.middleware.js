const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

module.exports.userCheck = (req, res, next) => {
    const token = req.cookies.jwt
    if(token) {
        jwt.verify(token, process.env.TOKEN, async (err, decodeToken) => {
            if(err) {
                res.locals.user = null;
                //res.cookie('jwt', '',  {maxAge: 1})
                next()
            } 
            else {
                let user = await UserModel.findById(decodeToken.id)
                console.log(user)
                res.locals.user = user
                next()
            }
        })
    }
    else {
        res.locals.user = null,
        next()
    }
}

module.exports.auth = (req, res, next) => {
    const token = req.cookies.jwt
    console.log("token:" + token)
    if(token) {
        jwt.verify(token, process.env.TOKEN, async(err, decodeToken) => {
            if(err) {
                console.log("erreur: " + err)
                res.send("error token: " + err)
            }
            else {
                console.log("decodeToken:" + decodeToken.id)
                next()
            }
        })
    }
    else{
         console.log("Error no token found")
    }
}