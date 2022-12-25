const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello and welcome to the home page')
})

app.listen(5000, () => {
    console.log('server started at port 5000')
})