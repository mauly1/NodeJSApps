const request = require('request');

const geoLocation =(address,callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/$%7BencodeURIComponent${address}%7D.json?access_token=pk.eyJ1Ijoic3VtYXVyeWEiLCJhIjoiY2tpd3FiNnR4MGhhNjMwbnhnbmQycjl1eSJ9.xbND1Pnu_txVPDY8xTFS3w`;
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('BackEnd Service is not responding or down ', undefined)
        }else if(body.features.length<=0){
            callback('Detail not found for given address ,please use a new Address', undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[0],
                longitude: body.features[1].center[1],
                location: body.features[0].place_name,
            })
        }
    })
}
module.exports=geoLocation