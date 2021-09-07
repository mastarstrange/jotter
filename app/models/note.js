const mongoose = require('mongoose')
const Schema = mongoose.Schema
console.log('evaluating note.model')
// create note schema & model
const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Jot Something'],
    },
    text: {
      type: String,
    },
    tags: {
      type: Array,
      deafult: [],
    },
  }
  //   { collection: 'notes' } // Forcing the collection name on mongoose
)

const note = mongoose.model('note', noteSchema) // mongoose automatically creates the lowercase plural of the model name specified.

module.exports = note
