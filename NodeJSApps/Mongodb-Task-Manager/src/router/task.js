const express = require('express');
const Tasks = require('../models/Task')
const router = express.Router();
const bycrypt = require('bcryptjs')


//------------------------------------ Task related operations------------------
router.post('/tasks', async (req, res) => {
    const task = new Tasks(req.body);
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


router.get('/tasks/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const task = await Tasks.findById(_id)
        if (!task) {
            res.status(400).send('Task not found..')
        }
        res.status(200).send(task)

    } catch (e) {
        console.log(e);
        res.status(500).send('internal server error')
    }
})


// update operation for Task

router.patch('/tasks/:id', async (req, res) => {
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
        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save();

        //  const task = await Tasks.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        if (!task) {
            return res.status(400).send('Task not found..')
        }
        res.status(200).send(task)
    } catch (e) {
        console.log(e);
        res.status(500).send('internal server error')
    }


})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const task = await Tasks.findByIdAndDelete(_id)
        if (!task) {
            res.status(400).send('Task not found..')
        }
        res.status(200).send('Task deleted successfully..')

    } catch (e) {
        console.log(e);
        res.status(500).send('internal server error')
    }
})

module.exports = router