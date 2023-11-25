const express = require('express');
require('./db/mongoose');
const User = require('./models/user');

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User()
    console.log(req.body);
    res.send('testing !')
})

app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
})