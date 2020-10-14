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
//Add a new note
router.post('/', (req, res) => {
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            throw (err);
        }
        const db = JSON.parse(data)
        const noteId = db.length > 0 ? db[db.length - 1].id + 1 : db.length + 1
        db.push({ id: noteId, title: req.body.title, text: req.body.text })
        fs.writeFile(dbFilePath, JSON.stringify(db, null, 2), err => err ? console.log(err) : null)
        res.send(req.body)
    })
})
//Delete a note by id
router.delete('/:id', (req, res) => {
    const idToDelete = parseInt(req.params.id)
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            throw (err);
        }
        const db = JSON.parse(data)
        const new_db = []
        for (note of db) {
            if (note.id !== idToDelete) {
                new_db.push(note)
            }
        }
        fs.writeFile(dbFilePath, JSON.stringify(new_db, null, 2), err => err ? console.log(err) : null)
        res.send(`Note with id ${idToDelete} has been deleted`)
    })
})


module.exports = router