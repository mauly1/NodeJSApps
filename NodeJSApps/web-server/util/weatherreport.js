const request = require('request');

const weatherReport = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/forecast?access_key=66a0f9d516555ab06175c72613c815f0&query=${latitude},${longitude}&units=f`;
   console.log(url);
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('either weather service is down or may be there have network failure ', undefined)
        } else if (body.error) {
            callback(`service did not return weather report for passed latitude ${latitude} and longitude ${longitude} `, undefined)
        } else {
            callback(undefined,
                Number(body.temperature) <= 13 ? `it feels like 6 degree outside , ${body.daily.data[0].summary}`
                    : `it feels like more then 15 degree outside `
            )
        }
    })
}

module.exports = weatherReport
