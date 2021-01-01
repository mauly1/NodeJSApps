const mongoose = require('mongoose')
const validator =require('validator');
const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api'
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true
})

/*
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

const sunil = new User({
    name: ' SUNIL Kumar Maurya          ',
    age: 42,
    email:'sunil@gail.com                  ',
    password:'abcdefgh'
})

sunil.save().then((response) => {

    console.log('-------Response-------------')
    console.log(response)
}).catch((error) => {
    console.log('Error ', error)
})

const Amit = new User({
    name: '              Amit Patil         ',
    email:'          amit@gmail.com        ' ,
    password:'password'
})

Amit.save().then((response) => {

    console.log('-------Response-------------')
    console.log(response)
}).catch((error) => {
    console.log('Error ', error)
})

const Vinay = new User({
    name: 'Vinay baghel',
    age:6,
    email:'vinay@gmail.com',
    password:'abc'
})

Vinay.save().then((response) => {

    console.log('-------Response-------------')
    console.log(response)
}).catch((error) => {
    console.log('Error ', error)
})*/

/*

const Tasks = mongoose.model('Tasks', {
    description: {
        type: String,
        required:true,
        trim:true
    }, completed: {
        type: Boolean,
        default:false
    }
})

const reactTask = new Tasks({
    description: 'Make sure you should have good command on React',
    completed: true
})
const awsTask = new Tasks({
    description: 'Make sure you should have good command on AWS',
    completed: false
})
const nodeTask = new Tasks({
    description: 'Need to make good command on Node JS'

})

reactTask.save().then((response) => {
    console.log('----------------ReactTask Response--------------')
    console.log(response)
}).catch((error) => {
    console.log('Error:', error)
})

nodeTask.save().then((response) => {
    console.log('----------------NodeTask Response--------------')
    console.log(response)
}).catch((error) => {
    console.log('Error:', error)
})

awsTask.save().then((response) => {
    console.log('----------------AWS Task Response--------------')
    console.log(response)
}).catch((error) => {
    console.log('Error:', error)
})
*/
