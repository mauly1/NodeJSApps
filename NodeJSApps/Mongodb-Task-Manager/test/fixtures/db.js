const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/User')
const Task = require('../../src/models/Task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'initialuser',
    email: 'initialuser@gmail.com',
    password: 'initialuser@#!',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'seconduser',
    email: 'seconduser@gmail.com',
    password: 'seconduser@#!',
    tokens: [{
        token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'task one description',
    completed: false,
    owner: userOne._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'task Two description',
    completed: true,
    owner: userOne._id
}
const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'task Third description',
    completed: true,
    owner: userTwo._id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()

    await Task.deleteMany()
    await new User(taskOne).save()
    await new User(taskTwo).save()
    await new User(taskThird).save()
}
module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}