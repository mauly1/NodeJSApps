const app = require('./app')

console.log('process.env.PORT', process.env.PORT)
const port = process.env.PORT

app.listen(port, () => {
    console.log(`-------- Server is up on port ${port} ---------`)
})


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
/*
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
myfunciton()*/
/*
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
console.log('-------- After data manipulation returning empty object--------- ',JSON.stringify(data))*/

/*const Task =require('./models/Task')
const main = async ()=>{
const task =await Task.findById('5ff30c49778a78be941f58b7');
await task.populate('owner').execPopulate()
console.log("------------------------ ",task)*/

// below methods populate will do the same work for patch/update operations
/*
const User =require('./models/User')
const main =async ()=>{
    const user =await User.findById('5ff31aab95d7f5c0e8e73d40')
    console.log('------------------user---------------- ',user);
    await user.populate('tasks').execPopulate()
    console.log('------------------user Task----------------',user.tasks);
}
main()*/

// file upload example

/*
const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        filesize: 1000000
    }, fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('please upload a word documents file'))
        }
        cb(undefined, true)
    }
})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.status(200).send('image uploaded successfully...');
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})*/
