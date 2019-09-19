const fetch = require("node-fetch")
const fs = require('fs')

module.exports.assignRoutes = app => {
  app.get("/buscarJSON", function (req, res) {
    fetch('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=64303698a48effb62677752107150d355a274937')
      .then(response => {
        if (!response.ok)
          throw new Error()

        return response.json()
      })
      .then(response => {
        console.log(__dirname)
        const answer = JSON.stringify(response)
        fs.writeFile('answer.json', answer, function (err) {
          if (err)
            throw err

          console.log('Saved!');
        });

        res.send(answer)
      })
      .catch((error) => console.log('3', error))
  })

  app.post("/encaminharJSON", function (req, res) {
    console.log(req.body)
    const answer = JSON.stringify(req.body)

    fs.writeFile('answer.json', answer, function (err) {
      if (err)
        throw err

      console.log('Saved!')
    });

    res.status(200).send(answer)
  })
}