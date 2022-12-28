//Initializations
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://ShreyanshAgrawal:e50cf28@cluster0.pf6t0zk.mongodb.net/notesdb").then(() => {
    console.log('connected to mongodb')

    app.get('/', (req, res) => {
        console.log('Home page')
        res.send('Hello and welcome to the home page')
    })

    const notesRoutes = require('./routes/notes_routes');
    app.use('/', notesRoutes);

    const userRoutes = require('./routes/user_router'); 
    app.use('/users',userRoutes)

})

const port = process.env.port || 5000
app.listen(port, () => {
    console.log(`server started at port : ${port}`)
})