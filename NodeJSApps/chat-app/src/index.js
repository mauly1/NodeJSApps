const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')
const {generateMessage, generateLocation} = require('../src/utils/messages')
const {addUsers, removeUser, getUser, getUsersInRoom} = require('../src/utils/users')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

/* NOTES
* 1. socket.emit  -- that send event to a specific client
* 2. io.emit - that send event to every connected client
* 3. socket.broadcast.emit  -- that send event to every client except socket(menas message will send to other excluding sender)
* 4. socket.join(room)  allowed to send event to client in that specific room
* 5. io.to(room).emit - its emit event to everyone in a specific room
* 6. socket.broadcast.to(room).emit - the same functionality but event should be emited with in that room
* */

console.log('port', process.env.PORT)

const PORT = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))


io.on('connection', (socket) => {

    console.log('New WebSocket connection')


    socket.on('join', ({username, room}, callback) => {
        const {error, user} = addUsers({id: socket.id, username, room})
        if (error) {
            return callback(error)
        }
        socket.join(user.room)
        socket.emit('message', generateMessage(user.username,' Welcome!'))

        socket.broadcast.to(user.room).emit('message', generateMessage(user.username, ` has joined !`))
        io.to(user.room).emit('roomData',{
            room:user.room,
            users:getUsersInRoom(user.room)
        })
        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        const filter = new Filter()
        if (filter.isProfane(message)) {
            return callback('profanity is not allowed')
        }
        io.to(user.room).emit('message', generateMessage(user.username,message))
        callback('Thank you got your message')
    })
    socket.on('disconnect', () => {
        console.log('A user has left the chat..')
        const user = removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('message', generateMessage( user.username,`${user.username} has left the chat`))
            io.to(user.room).emit('roomData',{
                room:user.room,
                users:getUsersInRoom(user.room)
            })
        }

    })
    socket.on('sendLocation', (location, callback) => {
        const user = getUser(socket.id)
        console.log('-----Server received location-------- ', location)
        console.log('-----Server received location-------- ', location.latitude, location.longitude)

        console.log('-----user-------- ', user)
        io.to(user.room).emit('locationMessage', generateLocation(user.username,`https://google.com/maps?q=${location.latitude},${location.longitude}`))
        callback('---- thank you from index.js got location details ack..')

    })
})

server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}!`)
})

//-------- practice code for websocket------

// let count = 0
//
// // Server(emit) -> client( receive) -> countUpdated
// // client(emit) -> Server(receive) -> increment/decrement
//
// io.on('connection', (socket) => {
//
//     console.log('New Web Socket Connection established....')
//     // send event to client
//     socket.emit('countUpdated',count)
//     console.log('----- server has sent updated count-----------')
//
//     socket.on('increment',()=>{
//         count++
//       //  socket.emit('countUpdated',count)  // this socket.emit will send  event changes  only one client , the client who is doing those changes
//         io.emit('countUpdated',count) // this io.emit will send event to each client connected with this server
//     })
//     socket.on('decrement',()=>{
//         count--
//     //    socket.emit('countUpdated',count)  // this socket.emit will send  event changes  only one client , the client who is doing those changes
//         io.emit('countUpdated',count) // this io.emit will send event to each client connected with this server
//     })
//
// })

/*io.on('connection', (socket) => {
    console.log('new Connection established....')
    socket.emit('message','Welcome!')
})*/
/*

io.on('connection', (socket) => {
    console.log('connection established !!')
    socket.emit('message', 'Welcome !!')
    socket.on('sendMessage', (message)=>{
        io.emit('message',message)
    })
})

server.listen(PORT, () => {
    console.log(`-------- Server is up on port ${PORT} ---------`)

})
*/