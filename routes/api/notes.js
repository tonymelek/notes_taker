//Dependencies
const express = require('express')
const fs = require('fs')
const router = express.Router()
const path = require('path')

// Database JSON File Location
const dbFilePath = path.join(__dirname, '../../db', 'db.json')
//Get all notes
router.get('/', (req, res) => {
    res.sendFile(dbFilePath)
})

//Read Json file and store into a global variable db so as to be updated and accessed by any endpoint
let db;
fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
        throw (err);
    }
    db = JSON.parse(data)
})

//Add a new note
router.post('/', (req, res) => {
    //create a uniquie note ID
    const noteId = db.length > 0 ? db[db.length - 1].id + 1 : db.length + 1
    db.push({ id: noteId, title: req.body.title, text: req.body.text })
    //update db.json file
    fs.writeFile(dbFilePath, JSON.stringify(db, null, 2), err => err ? console.log(err) : null)
    // res.send(req.body)
    res.redirect('/notes')
})
//Delete a note by id
router.delete('/:id', (req, res) => {
    const idToDelete = parseInt(req.params.id)
    const new_db = []
    for (note of db) { //Loop in db and ommit the note to be deleted
        if (note.id !== idToDelete) {
            new_db.push(note)
        }
    }
    db = new_db //update global db with the new_db after deleting the notes
    //update db.json file
    fs.writeFile(dbFilePath, JSON.stringify(new_db, null, 2), err => err ? console.log(err) : null)
    res.send(`Note with id ${idToDelete} has been deleted`)
})


module.exports = router