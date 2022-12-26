//Initializations
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Note = require('./models/Note')
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

    app.get('/notes', async (req, res) => {
        var notes = await Note.find();
        console.log('All Notes')
        res.json(notes)
    })

    app.post('/notes/add', async (req, res) => {

        await Note.deleteOne({ id: req.body.id })

        const newNote = new Note({
            id: req.body.id,
            userid: req.body.userid,
            title: req.body.title,
            content: req.body.content
        });
        await newNote.save();
        const response = { message: "new Note Created!" }
        console.log('Added new Note')
        res.json(newNote);
    })

    app.get('/notes/:userid', async (req, res) => {
        var notes = await Note.find({ userid: req.params.userid })
        console.log(`Got all notes for ${req.params.userid}`)
        res.json(notes);
    })

    app.delete('/notes/delete/:id', async (req, res) => {
        await Note.deleteOne({ id: req.params.id })
        console.log(`Deleted the note with id : ${req.params.id}`)
        const response = {message : "note deleted"}
        res.json(response)
    })
    
})

const port = process.env.port || 5000
app.listen(port, () => {
    console.log(`server started at port : ${port}`)
})