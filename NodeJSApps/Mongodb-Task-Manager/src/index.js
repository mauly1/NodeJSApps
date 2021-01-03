const express = require('express')
const app = express()
require('./db/mongoose')
const userRouter = require('../src/router/user')
const taskRouter = require('../src/router/task')

const port = process.env.PORT || 3000
app.use(express.json())
app.use(userRouter);
app.use(taskRouter)


app.listen(port, () => {
    console.log(`-------- Server is up on port ${port} ---------`)
})

const jwt = require('jsonwebtoken')

const myfunciton = async () => {
    const token = jwt.sign({_di: 'GoldySunil'}, 'thisismynewcourse')
    console.log('token', token)
    //valid token validation scenario
   const data =jwt.verify(token,'thisismynewcourse')
    console.log(data);

    //Invalid token validation scenario
    const invalidata =jwt.verify(token,'InvalidSecrtedKey')
    console.log(invalidata);
    // output will be  UnhandledPromiseRejectionWarning: JsonWebTokenError: invalid signature

    // set expiry time for JWT
    const tokenWithExpriry = jwt.sign({_di: 'GoldySunil'}, 'thisismynewcourse',{expiresIn: '7 days'})
    console.log('token', tokenWithExpriry)
}
myfunciton()

