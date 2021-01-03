const express = require('express')
const app = express()
require('./db/mongoose')
const userRouter =require('../src/router/user')
const taskRouter =require('../src/router/task')

const port = process.env.PORT || 3000
app.use(express.json())
app.use(userRouter);
app.use(taskRouter)


app.listen(port, () => {
    console.log(`-------- Server is up on port ${port} ---------`)
})

const bcrypt = require('bcryptjs');
const myfunciton =async ()=>{
    const password='Test123!@#';
    const bcryptPassword = await bcrypt.hash(password,8);
    console.log('password ',password)
    console.log('bcryptPassword ',bcryptPassword)

    const isMatch =await bcrypt.compare('Test123!@#',bcryptPassword);
    console.log('isMatch value ',isMatch)
}
myfunciton()

