// app: jotter
// made with love by mastarstrange

var express = require('express') // Requiring express package

const mongoose = require('mongoose') // Requiring mongoose package

const db = require('../config/db') // Keeping database links seperately in config folder

const app = express() // Declaring and assigning an express object

var path = require('path') //? For altering static path

//? The linking of scripts won't work without this due to some static error
app.use(express.static(path.join(__dirname, 'src')))

app.use(express.static('public'))

app.use(express.static(__dirname)) // This command fetches the index.html in the specified path

// Connecting to mongodb with mongoose
mongoose.connect(db.url, { useUnifiedTopology: true, useNewUrlParser: true })
//! Need more info on this
mongoose.Promise = global.Promise
const con = mongoose.connection

app.use(express.json()) // Body Parser renewed

// Console help for confirming mongoose connection
try {
  con.on('open', () => {
    console.log('mongoose is connected')
  })
} catch (error) {
  console.log('Error: ' + error)
}
// con.once('open', () => console.log('Mongoose is connected')) // Alternative code

// One stupid line to waste a whole day on
// Here /jd is the base url for the routes from the required file
app.use('/jd', require('./routes/note.routes'))

// error handling middleware
//! Need more info
// app.use((err, req, res, next) => {
//   console.log(err)
//   res.status(422).send({ error: err.message })
// })

// Port Listening
let port = process.env.PORT
if (port == null || port == '') {
  port = 8000
}
app.listen(port, () => console.log('strange listening on ' + port))
