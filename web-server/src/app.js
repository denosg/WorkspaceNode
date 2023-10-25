const path = require('path')
const express = require('express')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'cacat',
        location: 'zalau'
    })
})

app.listen(port = 3000, () => {
    console.log(`Server is up on port ${port}`)
})
