const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Costelas',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Despre mn',
        name: 'Costelas',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Ajutor',
        helpMsg: 'Ajutor <3',
        name: 'Costelas',
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an addres term',
        })
    }

    res.send({
        forecast: 'cacat',
        location: 'zalau',
        address: req.query.address,
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term',
        })
    }

    console.log(req.query)
    res.send({
        products: [],
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMessage: 'This article is not available',
        name: 'Costelas'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        errorMessage: 'Page not found',
        name: 'Costelas'
    })
})

app.listen(port = 3000, () => {
    console.log(`Server is up on port ${port}`)
})
