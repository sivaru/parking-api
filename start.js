const mongoose = require('mongoose')

require('dotenv').config()

mongoose.connect(process.env.DATABASE)
mongoose.Promise = global.Promise
mongoose.connection.on('error', err => {
  console.log(`ðŸ’©ðŸ’©ðŸ’©: ${err.message}`)
})

require('./models/User')

const app = require('./app')

app.set('port', process.env.PORT || 7777)

const server = app.listen(app.get('port'), () => {
  console.log(`Express is running in port ${server.address().port}`)
})