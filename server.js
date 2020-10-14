//Dependecies and libraries
const express = require('express')

const path = require('path')
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Creating static Path
app.use(express.static(path.join(__dirname, 'public')))

//Creating a path to notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})
//Creating route to notes api
app.use('/api/notes', require('./routes/api/notes'))

app.listen(PORT, () => console.log(`Server is now up and running on port ${PORT}`))