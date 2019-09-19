const http = require('http')
const port = 4001

// Configuração do servidor 
const express = require('express')
const app = express()

// Middleware
const allowCors = require('./config/cors')
const bodyParser = require('body-parser')
const route = require('./routes')

app.use(bodyParser.json())
app.use(allowCors)

route.assignRoutes(app)



http.createServer(app)
  .listen(port, () => console.log(`Servidor rodando local na porta ${port}`))