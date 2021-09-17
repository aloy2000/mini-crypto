const userModel = require('../models/user.model');
const jsonwebtoken = require('jsonwebtoken');
const { registerError, loginError } = require('../errors/error');

module.exports.signUp = async(req, res) => {
    const {pseudo, email, password} = req.body;

    try{
        const user = await userModel.create({pseudo, email,password});
        res.status(201).json({user: user._id});

    }catch(e) {
        const errors = registerError(e)
        console.log({e})
        res.status(500).send({ errors });
    }
}

const expiration = 1000 * 60 * 60  * 60 * 24;

const createToken = (id) => {
    return jsonwebtoken.sign({id}, process.env.TOKEN, {
        expiresIn: expiration
    })
}

module.exports.signIn = async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await userModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge:expiration});
        res.status(200).json({user: user._id});
    }catch(err) {
        console.log(err)
        const errors = loginError(err)
        res.status(500).send({errors});
    }
}

module.exports.logout = async (req, res) => {
    res.cookies('jwt', '', {maxAge: 1})
    res.redirect('/')
}
