const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
    }]
})

// generate token

userSChema.methods.generateToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'thisIsNewJWTToken')
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
    return userObject
}

const User = mongoose.model('User', userSChema)
module.exports = User
