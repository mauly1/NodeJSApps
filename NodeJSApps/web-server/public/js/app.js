
const weatherForm = document.querySelector('form')
const search=document.querySelector('input');
const messageOne= document.querySelector(`#message-1`);
const messageTwo= document.querySelector(`#message-2`);



console.log('form Search elements ',search)

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location =search.value
    console.log('weatherForm', 'submitted')
    console.log('weatherForm', weatherForm)
    console.log('Location form Search elements ',location)
    messageOne.textContent='Loading...'
    messageOne.textContent=''
const url=`http://localhost:3000/weather?address=${location}`
    console.log('backend url ',url)
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent=`${data.error}`;
                messageTwo.textContent=''
                return console.log('backend service call from java script return error ', data.error)
            }
            console.log('java script response data------------------------> ', data)
            const detail = `Location : ${data[0].location} , Latitude: ${data[0].latitude} ,longitude ${data[0].longitude} ,
            message: ${data[0].response}`
            messageOne.textContent=''
            messageTwo.textContent=detail

            //messageTwo.textContent=JSON.stringify(data)
            /* console.log('data.forecast ', data[0].forecast)
             console.log('data.latitude', data[0].latitude)
             console.log('data.location', data[0].location)
             console.log('data.longitude', data[0].longitude)
             console.log('data.response', data[0].response)*/
        })
    })




})