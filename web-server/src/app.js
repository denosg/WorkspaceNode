const express = require('express')

const app = express()

// app.com
// app.com/help
// app.com/about

app.get('', (req, res) => {
    res.send('<h1>suge-o</h1>')
})

app.get('/help', (req, res) => {
    res.send({
        name: 'Denis',
        age: 20,
    })
})

app.get('/about', (req, res) => {
    res.send('<h1>Despre mn</h1>')
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'cacat',
        location: 'zalau'
    })
})

app.listen(port = 3000, () => {
    console.log(`Server is up on port ${port}`)
})
