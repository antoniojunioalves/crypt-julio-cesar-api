// const express = require('express')
// const app = express()
// const rotas = require('../routes')

// // Middleware
// const bodyParser = require('body-parser')
// const allowCors = require('./config/cors')

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
// app.use(allowCors)

// rotas.assignRoutes(app)

// module.exports = app



const express = require('express')
const app = express()

const allowCors = require('./config/cors')
const bodyParser = require('body-parser')
const route = require('./routes')

app.use(bodyParser.json())
app.use(allowCors)

route.assignRoutes(app)

module.exports = app