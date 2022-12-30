const router = require('express').Router();
const Note = require('../models/Note');

const notesController = require('../controllers/notes_controller');

router.get('/',notesController.getallnotes )

router.post('/add', notesController.addorUpdateNote)

router.get('/:userid', notesController.getNotebyId)

router.delete('/delete/:id',notesController.deleteNote)

module.exports = router; 