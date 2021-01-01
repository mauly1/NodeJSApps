
const mongoose = require('mongoose')
const validator =require('validator');


const User = mongoose.model('User', {
    name: {
        type: String,
        required:true,
        trim:true,
        lowercase:true
    },
    password: {
        type: String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.includes('password')){
                throw new Error('Password con not contain "password" ')
            }
        }
    },
    age: {
        type: Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Age should be a positive number...');
            }
        }
    },
    email:{
        type:String,
        required: true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(` Email id  ${value} is invalid`)
            }

        }

    }
})


module.exports =User
