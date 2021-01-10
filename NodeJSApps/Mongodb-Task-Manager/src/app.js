const express = require('express')
const app = express()
require('./db/mongoose')
const userRouter = require('../src/router/user')
const taskRouter = require('../src/router/task')

app.use(express.json())
app.use(userRouter);
app.use(taskRouter)

module.exports = app

