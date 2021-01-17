const socket = io()
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $messageFormSendLocationButton = document.querySelector('#send-location')
const $messagesDiv = document.querySelector('#messagesDiv')
const $locationDiv = document.querySelector('#locationDiv')
const $sidebarDiv = document.querySelector('#sidebarDiv')


// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

// Options
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true})
console.log('--------------username, room------ ', username, room)

const autoScrollMessages = () => {
    const $newMessage = $messagesDiv.lastElementChild
    //height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newSendMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newSendMessageMargin

    // visible height
    const visibleHeight = $messagesDiv.offsetHeight
    // height of message container
    const containerHeight = $messagesDiv.scrollHeight
    // How far have i scrolled?
    const scrollOffSet = $messagesDiv.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffSet) {
        $messagesDiv.scrollTop = $messagesDiv.scrollHeight
    }
}
const autoScrollSendLocation = () => {
    const $newMessage = $locationDiv.lastElementChild
    //height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newSendMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newSendMessageMargin

    // visible height
    const visibleHeight = $locationDiv.offsetHeight
    // height of message container
    const containerHeight = $locationDiv.scrollHeight
    // How far have i scrolled?
    const scrollOffSet = $locationDiv.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffSet) {
        $locationDiv.scrollTop = $locationDiv.scrollHeight
    }
}

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('hh:mm:ss a')
    })
    $messagesDiv.insertAdjacentHTML('beforeend', html)
    autoScrollMessages()
})


socket.on('locationMessage', (location) => {
    console.log('------- Get Response location from chat.js file-----', location)
    const locationHtml = Mustache.render(locationTemplate, {
        username: location.username,
        url: location.url,
        createdAt: moment(location.createdAt).format('hh:mm:ss a')
    })
    $locationDiv.insertAdjacentHTML('beforeend', locationHtml)
    autoScrollSendLocation()
})

socket.on('roomData', ({room, users}) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    $sidebarDiv.innerHTML = html
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    $messageFormButton.setAttribute('disabled', 'disabled')
//disable button
    const message = e.target.elements.message.value
//enable button
    socket.emit('sendMessage', message, (response) => {
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()
        console.log('chat.js file sendMessage: message was delivered.', response)
    })
})

document.querySelector('#send-location').addEventListener('click', (e) => {
    console.log('------------- send-location event occurred ------------------- ')
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    }
    /*    navigator.geolocation.getCurrentPosition((position)=>{
            const location ={
                latitude: 18.520430,
                longitude:73.856743
            }
            console.log('--------POSITION-------- ',position)
            console.log('--------LOCATION-------- ',position)
            socket.emit('location',location)

        })*/

    const location = {
        latitude: 18.520430,
        longitude: 73.856743
    }
    console.log('--------LOCATION-------- ', location)
    $messageFormSendLocationButton.setAttribute('disabled', 'disabled')
    socket.emit('sendLocation', location, (response) => {
        $messageFormSendLocationButton.removeAttribute('disabled')
        console.log('------ Client chat.js received acknowledgement---', response)
    })
})

socket.emit('join', {username, room}, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})


// ----------- practice code for websocket----

/*

const socket = io()
// get event which was sent by Server
socket.on('countUpdated',(response)=>{
    console.log('-->>>>>>>>>>>> Client got updated count <<<<<<<<<<<---',response)
})

document.querySelector('#increment').addEventListener('click',()=>{
    console.log('Increment button clicked')
    socket.emit('increment')
})

document.querySelector('#decrement').addEventListener('click',()=>{
    console.log('decrement button clicked')
    socket.emit('decrement')
})*/

/*

const socket = io()

socket.on('message', (response) => {
    console.log(response)
})*/