const jwt = require('jsonwebtoken')
const User = require('../models/User')
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log('header Authorization Token Value: ', token)
        const decode = jwt.verify(token, 'thisIsNewJWTToken')
        console.log('decode value ',decode)
        const user = await User.findById({_id: decode._id,'tokens.token':token})
        if(!user){
            throw new Error()
        }
        req.token =token
        req.user =user
        next()
    } catch (e) {
        res.status(401).send({Error: 'please authenticate.'})
    }
}

module.exports = auth