const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./Task')

const userSChema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.includes('password')) {
                throw new Error('Password con not contain "password" ')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age should be a positive number...');
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error(` Email id  ${value} is invalid`)
            }

        }

    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
})

// virtual reference.
// this below combination is not going to store in database but to get reference task for any user it will help us to store it aa a virtual data.


userSChema.virtual('tasks',{
    ref:'Tasks',
    localField:'_id',   //_id is userid
    foreignField:'owner'
})
// generate token

userSChema.methods.generateToken = async function () {
    const user = this
    const jwtSecret = process.env.JWT_SECRET || 'thisIsNewJWTToken'
    const token = jwt.sign({_id: user._id.toString()}, jwtSecret)
    console.log('Generated token', token)
    user.tokens= user.tokens.concat({token})
    await user.save()
    return token
}

//Hash the plan password before saving
userSChema.pre('save', async function (next) {
    const user = this;
    console.log('Just before saving.....')
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

// while deleting any user profile this middleware will also delete that user created all the tasks

userSChema.pre('remove', async function (next){
    const user =this
    await Task.deleteMany({owner:user._id})
    next()
})

// find by user by there Credentials (email and password)
userSChema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if (!user) {
        throw new Error('unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password)
    console.log('isMatch---------', isMatch)
    if (!isMatch) {
        throw new Error('unable to login');
    }
    console.log('return user: ', user)
    return user
}

// remove password and other sensitive data from response
userSChema.methods.toJSON =function(){
    const user =this
    const userObject =user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

const User = mongoose.model('User', userSChema)
module.exports = User
