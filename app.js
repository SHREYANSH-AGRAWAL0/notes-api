const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello and welcome to the home page')
})
const port = process.env.port || 5000
app.listen(port, () => {
    console.log('server started at port 5000')
})