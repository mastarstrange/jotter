require('dotenv').config()

// local database
// module.exports = {
//   url: 'mongodb://localhost/jotscluster',
// }

// online atlas connect
module.exports = {
  url: process.env.MONGODB_JOTS,
}
