const geoCode = require('./geocode')
const weatherReport = require('./weatherreport')

let address = process.argv.slice(2);
if (!address) {
    console.log('please provide an address')
} else {
    geoCode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return console.log('Geo Code Error:', error);
        }

        weatherReport(latitude, longitude, (error, response) => {
            if (error) {
                return console.log('Weather Report Error:', error);
            }
            console.log('Weather Report Response:', response);

            console.log(`for the address ${location} and its latitude ${latitude} and longitude ${longitude}`)

        })
    })
}




