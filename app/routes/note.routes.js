console.log('evaluating note.routes') // Confirming the routes JS is evaluated
const express = require('express') // Express module
const note = express.Router() // Creating a new route object
const nModel = require('../models/note') // Importing Note schema module

//# Create operation routing (post)
note.post('/notes', (req, res, next) => {
  console.log('evaluating create operation')
  nModel
    .create(req.body)
    .then((note) => res.send('Note created Successfully!\n' + note.title))
    .catch(next)
})

//# Read operation routing (get)
note.get('/notes', (req, res, next) => {
  console.log('evaluating read operation')
  nModel
    .find({}) // No Query for filtering
    .then((notes) => res.send(notes))
    .catch(next)
})

//# Update operation routing (put)
note.put('/note/:id', function (req, res, next) {
  let uID = req.params.id
  console.log('evaluating update operation')
  nModel
    .findOneAndUpdate({ _id: uID }, req.body)
    .then(() => {
      nModel.findOne({ _id: uID }).then((note) => res.send('smmuccesfully updated ' + note.title))
    })
    .catch(next)
})

//# Delete operation routing (delete)
note.delete('/note/:id', (req, res) => {
  var dID = req.params.id // Extracting id from requested parametes
  console.log('evaluating delete operation')
  nModel
    .findOneAndDelete({ _id: dID })
    .then((note) => res.send('note with title: ' + note.title + ', is deleted'))
})

module.exports = note
