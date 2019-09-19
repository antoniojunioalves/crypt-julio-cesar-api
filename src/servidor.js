const http = require('http')
const app = require('./routes')
const port = 4001


http.createServer(app)
  .listen(port, () => console.log(`Servidor rodando local na porta ${port}`))
