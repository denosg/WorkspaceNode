const express = require('express')

const app = express()

// app.com
// app.com/help
// app.com/about

app.get('', (req, res) => {
    res.send('suge-o')
})

app.get('/help', (req, res) => {
    res.send('ajuta-ma <3')
})

app.get('/about', (req, res) => {
    res.send('despre mn')
})

app.get('/weather', (req, res) => {
    res.send('ploua afara drq')
})

app.listen(port = 3000, () => {
    console.log(`Server is up on port ${port}`)
})
