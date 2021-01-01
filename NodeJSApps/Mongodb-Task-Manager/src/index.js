const express = require('express')
const app = express()
require('./db/mongoose')
const User = require('./models/User')
const Tasks = require('./models/Task')


const port = process.env.PORT || 3000
app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save().then((response) => {
        console.log("--------Post Operation Response--------");
        console.log(response)
        res.status(201).send(response)
    }).catch((error) => {
        console.log('Error on Save operation: ', error)
        res.status(400).send(error)
    })
})

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users);
    }).catch(() => {
        res.status(500).send('something went wrong at server side or mongo db is down');
    })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id
    User.findById(_id).then((user) => {
        if (!user) {
            return res.send({
                status_code: 404,
                status_message: 'Forbidden when "no data available"',
                message: `for ${_id} user detail not found`
            })
        }
        res.status(200).send(user);
    }).catch((error) => {
        res.status(500).send(error);
    })
})
app.get('/users/name/:name', (req, res) => {
    const name = req.params.name
    User.findOne(name).then((user) => {
        res.status(200).send(user);
    })
})

app.post('/tasks', (req, res) => {

    const task = new Tasks(req.body);
    task.save().then((response) => {
        console.log('-------------------------');
        console.log(response);
        res.status(201).send(response);
    }).catch((error) => {
        console.log('Error while saving the Task in MongoDB ', error);
        res.status(400).send(error);
    })
})

app.get('/tasks', (req, res) => {
    User.find({}).then((tasks) => {
        res.send(tasks);
    }).catch(() => {
        res.status(500).send('something went wrong at server side or mongo db is down');
    })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id
    User.findById(_id).then((task) => {
        if (!task) {
            return res.send({
                status_code: 404,
                status_message: 'Forbidden when "no data available"',
                message: `for ${_id} user detail not found`
            })
        }
        res.status(200).send(user);
    }).catch((error) => {
        res.status(500).send(error);
    })
})


app.listen(port, () => {
    console.log(`-------- Server is up on port ${port} ---------`)
})
