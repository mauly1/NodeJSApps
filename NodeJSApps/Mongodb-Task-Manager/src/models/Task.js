const mongoose = require('mongoose')
const validator = require('validator');
const bycrypt = require('bcryptjs')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    }, completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {timestamps: true})

/*taskSchema.pre('save', async function (next) {
    const task = this;
    console.log('Just before saving the task....')
    if (task.isModified('description')) {
        task.description = await bycrypt.hash(task.description,8)
    }
    next()
})*/
const Tasks = mongoose.model('Tasks', taskSchema)
module.exports = Tasks


