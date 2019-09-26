const fetch = require("node-fetch")
const fs = require('fs')

const salvarArquivo = (answer) => {
  fs.writeFile('answer.json', answer, function (err) {
    if (err)
      throw err

    console.log('Saved!')
  });
}

module.exports.assignRoutes = app => {

  app.get("/buscarJSON", function (req, res) {
    fetch('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=64303698a48effb62677752107150d355a274937')
      .then(response => {
        if (!response.ok)
          throw new Error()

        return response.json()
      })
      .then(response => {
        const answer = JSON.stringify(response)

        salvarArquivo(answer)

        res.send(answer)
      })
      .catch((error) => console.log('3', error))
  })

  app.post("/salvarJSON", function (req, res) {
    console.log(req.body)
    const answer = JSON.stringify(req.body)

    salvarArquivo(answer)

    res.send(answer)
  })
}