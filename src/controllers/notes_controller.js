const Note = require('../models/Note');

exports.getallnotes = async (req, res) => {
    var notes = await Note.find();
    console.log('All Notes')
    res.json(notes)
}

exports.addorUpdateNote = async (req, res) => {

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
}


exports.getNotebyId = async (req, res) => {
    var notes = await Note.find({ userid: req.params.userid })
    console.log(`Got all notes for ${req.params.userid}`)
    res.json(notes);
}

exports.deleteNote =  async (req, res) => {
    await Note.deleteOne({ id: req.params.id })
    console.log(`Deleted the note with id : ${req.params.id}`)
    const response = { message: "note deleted" }
    res.json(response)
}