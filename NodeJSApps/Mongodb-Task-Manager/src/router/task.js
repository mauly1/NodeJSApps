const express = require('express');
const Tasks = require('../models/Task')
const router = express.Router();
const bycrypt = require('bcryptjs')
const auth = require('../middleware/auth')


//------------------------------------ Task related operations------------------
router.post('/tasks', auth, async (req, res) => {
    const task = new Tasks({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        console.log(e);
        res.status(500).send('internal server error')
    }
})


router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Tasks.find({})
        res.status(200).send(tasks)
    } catch (e) {
        console.log(e);
        res.status(500).send('internal server error')
    }
})

router.get('/tasks/me', auth, async (req, res) => {
    try {
        const _id = req.user._id
        const tasks = await Tasks.find({owner: _id})
        res.status(200).send(tasks)

        /*        // alternate option to do the same thing by through the populate
                await req.user.populate('tasks').execPopulate()
                res.send(req.user.tasks)*/

    } catch (e) {
        console.log(e);
        res.status(500).send('internal server error')
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id
        const task = await Tasks.findOne({_id, owner: req.user._id})
        if (!task) {
            res.status(400).send('Task not found..')
        }
        res.status(200).send(task)

    } catch (e) {
        console.log(e);
        res.status(500).send('internal server error')
    }
})

// update operation for amy Task. You can update any task even though you are not creator for that task

router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({Error: 'Invalid field updates'})
    }
    try {
        console.log('task id ', _id)
        console.log('req.body', req.body)
        const task = await Tasks.findById(_id);
        console.log('Task ---', task)
        if (!task) {
            return res.status(400).send('Task not found..')
        }
        res.status(200).send(task)
    } catch (e) {
        console.log(e);
        res.status(500).send('internal server error')
    }


})

// user can update ony there tasks
router.patch('/tasks/me/:id', auth, async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({Error: 'Invalid field updates'})
    }
    try {

        const task = await Tasks.findOne({_id, owner: req.user._id});
        console.log('Task ---', task)
        if (!task) {
            return res.status(400).send('Task not found or You are not authorized to update that task. ')
        }

        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save();


        res.status(200).send(task)
    } catch (e) {
        console.log(e);
        res.status(500).send('internal server error')
    }


})
// Delete operation for amy Task. You can update any task even though you are not creator for that task
router.delete('/tasks/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const task = await Tasks.findByIdAndDelete(_id)
        if (!task) {
            return res.status(400).send('Task not found or You are not authorized to update that task. ')
        }
        res.status(200).send({
            message: 'Task deleted successfully..',
            task
        })

    } catch (e) {
        console.log(e);
        res.status(500).send('internal server error')
    }
})

// user can delete ony there tasks
router.delete('/tasks/me/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id
        const task = await Tasks.findOneAndDelete({_id, owner: req.user._id})
        if (!task) {
            res.status(400).send('Task not found..')
        }
        res.status(200).send({
            message: 'Task deleted successfully..',
            task
        })

    } catch (e) {
        console.log(e);
        res.status(500).send('internal server error')
    }
})
module.exports = router