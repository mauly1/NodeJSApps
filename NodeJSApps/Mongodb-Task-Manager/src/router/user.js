const express = require('express');
const User = require('../models/User')
const router = express.Router();


// post a new user info
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        console.log(e);
        res.status(500).send('internal server error')
    }
})
// get all user info
router.get('/users', async (req, res) => {
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

// update operation for Users

router.patch('/users/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body);
    const allowUpdates = ['name', 'password', 'age', 'email']

    const isValidOperation = updates.every((update)=>allowUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send(
            {
                error: 'Invalid updates'
            })
    }

    try {
        console.log(_id)
        console.log('req.body',req.body)
        const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        if (!user) {
            return   res.status(400).send('user not found..')
        }
        console.log('updated user ', user)
        res.status(200).send(user)
    } catch (e) {
        console.log(e);
        res.status(500).send(`internal server error: ${e}`)
    }
})
// delete user info
router.delete('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            res.status(400).send('User not found..')
        }
        res.status(200).send('User details deleted successfully..')

    } catch (e) {
        console.log(e);
        res.status(500).send({errortype:`internal server error`,errorMessage:""+e} )
    }
})



module.exports=router