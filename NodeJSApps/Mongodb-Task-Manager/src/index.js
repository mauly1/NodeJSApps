const express = require('express')
const app = express()
require('./db/mongoose')
const userRouter = require('../src/router/user')
const taskRouter = require('../src/router/task')

const port = process.env.PORT || 3000


// express middleware to do some thing (verifying token/logging user activity etc) before reaching request to router

/*app.use((req,res,next)=>{

    console.log('.......Express Middleware invoked...')
    console.log('req.method',req.method)
    console.log('req.path',req.path)
    next()

/!*    // below is the example of middleware uses
    if(req.method==='GET'){
        res.send('Get Request are disabled..')
    }else{
        next()
    }*!/

   /!* // below is the example of middleware uses
    if(req.method==='GET' || req.method==='POST' || req.method==='PATCH' || req.method==='DELETE'){
        res.status(503).send('Site is currently down !! come back soon.')
    }else{
        next()
    }*!/
})*/

app.use(express.json())
app.use(userRouter);
app.use(taskRouter)

app.listen(port, () => {
    console.log(`-------- Server is up on port ${port} ---------`)
})

const jwt = require('jsonwebtoken')

/*const myfunciton = async () => {
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
myfunciton()*/

// removing content from json

const data ={
    id:1,
    name:'sunil',
    age:'41'
}
console.log('-------- before data manipulation--------- ',JSON.stringify(data))

data.toJSON =function(){
    delete data.age
    return data
}

console.log('-------- After data manipulation returning deleting age and returning remaining object--------- ',JSON.stringify(data))

data.toJSON =function(){
    return {}
}
console.log('-------- After data manipulation returning empty object--------- ',JSON.stringify(data))
