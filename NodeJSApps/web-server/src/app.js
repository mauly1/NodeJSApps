const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('../util/geocode')
const weatherReport = require('../util/weatherreport')


const app = express()
const indexPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath);
hbs.registerPartials(partialsPath)
app.use(express.static(indexPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Weather News Editor'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'How may i assist you?',
        title: 'Help',
        name: 'sunil maurya'

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Help page for Weather App',
        name: 'sunil maurya'
    })
})

app.get('/products', ((req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide search query parameter'
        })
    }
    console.log(req.query)
    console.log(req.query.search)
    res.send({
        product: []
    })
}))

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'Address must be provided...'
        })
    }

    geoCode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            console.log('Geo code  Error:', error);
            return res.send({
                error:error
            })
        }

        weatherReport(latitude, longitude, (error, response) => {
            if (error) {
                console.log('Weather Report Error:', error);
                return res.send({
                    error:error
                })
            }
            console.log('Weather Report Response>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>:', response);

            console.log(`for the address ${location} and its latitude ${latitude} and longitude ${longitude}`)
            res.send([{
                response,
                location: address,
                longitude: longitude,
                latitude: latitude,
                forecast: 'fog'
            }])

        })
    })
})

app.get('/help/*', ((req, res) => {
    res.render('404', {
        title: '404 Error Page',
        errorText: 'Help article not found',
        name: 'sunil maurya'
    })
}))

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404 Error Page',
        errorText: 'About us article not found',
        name: 'sunil maurya'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error Page',
        errorText: 'page not found',
        name: 'sunil maurya'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
});
