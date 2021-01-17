//AddUser, RemoveUsers,GetUsers,GetUsersInRoom

const users = []

const addUsers = ({id, username, room}) => {
    // clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // validate the user
    if (!username || !room) {
        return {
            error: 'username and room required !'
        }
    }
    // check for existing username
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })
    //validate username
    if (existingUser) {
        return {
            error: 'username is in use !!'
        }
    }

    // store user
    const user = {id, username, room}
    users.push(user)

    return {user}
}

// remove user

const removeUser = (id) => {
    const index = users.findIndex((user) => {
        return user.id === id
    })
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser=(id)=>{
    return   users.find((user)=> user.id===id )
}

const getUsersInRoom=(room)=>{
    room =room.trim().toLowerCase()
    return  users.filter((user)=> user.room===room )
}

module.exports={
    addUsers,
    removeUser,
    getUser,
    getUsersInRoom
}

/*

const response1 = addUsers({
    id: 101,
    username: 'sunil',
    room: 'room1'
})
console.log(response1)
const response2 = addUsers({
    id: 102,
    username: 'amit',
    room: 'room1'
})
console.log(response2)
const response3 = addUsers({
    id: 103,
    username: 'akif',
    room: 'room2'
})
console.log(response3)
const response4 = addUsers({
    id: 104,
    username: 'vinay',
    room: 'room2'
})
console.log(response4)
const response5 = addUsers({
    id: 105,
    username: 'sunil',
    room: 'room1'
})
const response15 = addUsers({
    id: 115,
    username: 'sunil115',
    room: 'room1'
})
const response16 = addUsers({
    id: 116,
    username: 'sunil116',
    room: 'room1'
})

const response6 = addUsers({
    id: 106,
    username: 'vinay',
    room: 'room2'
})
console.log(response6)
const response7 = addUsers({
    id: 107,
    username: '',
    room: ''
})
console.log(response7)

/!*onsole.log('-------------------')
console.log('Before Users: ', users)
const response8 = removeUser(101)
console.log('removed user', response8)

console.log('-------------------')
console.log('After Users: ', users)
*!/



console.log('-----------getUser--------')
const response9 =getUser(101)
console.log(response9)


console.log('-----------getUserInRoom--------')
const usersList =getUsersInRoom('room2')
console.log(usersList)
*/
