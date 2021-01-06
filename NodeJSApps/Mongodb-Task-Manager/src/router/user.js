const express = require('express');
const User = require('../models/User')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')


// post a new user info / user sign up
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save()
        const token = await user.generateToken()
        console.log('JWT token', token)
        res.status(201).send({user, token})
    } catch (e) {
        console.log(e);
        res.status(500).send('internal server error')
    }
})
// find the user by his/her credentials . find user by email and password
router.post('/users/login', async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const user = await User.findByCredentials(email, password)
        const token = await user.generateToken()
        console.log('JWT token', token)
        res.send({user, token})
    } catch (e) {
        console.log(e);
        res.sendStatus(400).send()
    }
})

// logout the user

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        console.log(e);
        res.sendStatus(500).send()
    }
})

// logoutAll the user

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        console.log(e);
        res.sendStatus(500).send()
    }
})

// return only that User details which  user has been authenticated properly

// get detail for login user
router.get('/users/me', auth, async (req, res) => {
    res.status(200).send(req.user)
})

// delete operation for login user
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        console.log(e);
        res.status(500).send({errortype: `internal server error`, errorMessage: "" + e})
    }
})

// update operation for login User

router.patch('/users/me', auth, async (req, res) => {
    const _id = req.user._id
    const updates = Object.keys(req.body);
    const allowUpdates = ['name', 'password', 'age', 'email']

    const isValidOperation = updates.every((update) => allowUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send(
            {
                error: 'Invalid updates'
            })
    }
    try {
        console.log(_id)
        console.log('req.body', req.body)
        const user = req.user
        console.log('---------------USER-------->', user)
        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        await user.save()
        console.log('updated user ', user)
        res.status(200).send(user)
    } catch (e) {
        console.log(e);
        res.status(500).send(`internal server error: ${e}`)
    }

})

// get all user info
router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (e) {
        console.log(e);
        res.status(500).send('internal server error')
    }
})
//get a single user info
router.get('/user/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            res.status(400).send('User not found..')
        }
        res.status(200).send(user)
    } catch (e) {
        console.log(e);
        res.status(500).send('internal server error')
    }
})

// update operation for any Users

router.patch('/users/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body);
    const allowUpdates = ['name', 'password', 'age', 'email']

    const isValidOperation = updates.every((update) => allowUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send(
            {
                error: 'Invalid updates'
            })
    }

    try {
        console.log(_id)
        console.log('req.body', req.body)
        const user = await User.findById(_id);
        console.log('---------------USER-------->', user)
        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        await user.save()

        //  const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        if (!user) {
            return res.status(400).send('user not found..')
        }
        console.log('updated user ', user)
        res.status(200).send(user)
    } catch (e) {
        console.log(e);
        res.status(500).send(`internal server error: ${e}`)
    }
})
// delete any user info
router.delete('/users/delete/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            res.status(400).send('User not found..')
        }
        res.status(200).send('User details deleted successfully..')

    } catch (e) {
        console.log(e);
        res.status(500).send({errortype: `internal server error`, errorMessage: "" + e})
    }
})

// upload images for any user inside directory avatars

const imageUpload = multer({
    dest: 'avatars',
    limits:{
        filesize: 1000000
    },fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(doc|docx|jpg|jpeg|pdf)$/)){
            cb(new Error('only doc|docx|jpg|jpeg|pdf file extension supported'))
        }
        cb(undefined,true)
    }
})

router.post('/users/me/avatar',imageUpload.single('avatar'), (req, res) => {
    res.status(200).send(`AVATAR: image's has been uploaded successfully `)
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

module.exports = router