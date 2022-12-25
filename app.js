//Initializations
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Note = require('./models/Note')

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://ShreyanshAgrawal:e50cf28@cluster0.pf6t0zk.mongodb.net/notesdb").then(() => {
    console.log('connected to mongodb')
    
    app.get('/', (req, res) => {
        console.log('Home page')
        res.send('Hello and welcome to the home page')
    })

    app.get('/notes', async (req, res) => {
        var notes = await Note.find(); 
        console.log('All Notes')
        res.json(notes)
    })

    app.get('/notes/add', async (req, res) => {
        const newNote = new Note({
            id: "002",
            userid: "ashreyansh47@gmail.com",
            title: "My second Note",
            content: "Hello Everyone"
        }); 
       await newNote.save(); 
        const response = {message:"new Note Created!"}
        console.log('Added new Note')
        res.json(response); 
    })

    app.get('/notes/:userid', async (req, res) => {
        var notes = await Note.find({ userid: req.params.userid })
        console.log(`Got all notes for ${req.params.userid}`)
        res.json(notes); 
    })
    
})

const port = process.env.port || 5000
app.listen(port, () => {
    console.log(`server started at port : ${port}`)
})